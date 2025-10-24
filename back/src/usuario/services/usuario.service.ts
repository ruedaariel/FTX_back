
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ROL, UsuarioEntity } from '../entities/usuario.entity';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { Repository, EntityManager, DataSource, Not } from 'typeorm';
import { ErrorManager } from 'src/config/error.manager';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { DatosPersonalesEntity } from 'src/usuario-datos-personales/entities/datos-personales.entity';
import { DatosFisicosEntity } from 'src/usuario-datos-fisicos/entities/datos-fisicos.entity';
import { PlanService } from 'src/plan/services/plan.service';
import { ESTADO } from 'src/constantes/estado.enum';
import { RutinaEntity } from 'src/rutina/entities/rutina.entity';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/shared/email/email.service';
import { generateRandomPassword } from 'src/utils/random-password';
import { LoginDto } from '../dto/login.dto';
import { LoginRtaDto } from '../dto/login-rta.dto';
import { UsuarioRtaDto } from '../dto/usuario-rta.dto';
import { format } from 'date-fns';
import { plainToInstance } from 'class-transformer';
import { FileImgService } from 'src/shared/file-img/file-img.service';
import { transformarFecha } from 'src/utils/transformar-fecha';
import { UsuarioDatosCompletosRtaDto } from '../dto/usuario-datos-completos-rta.dto';
import { UpdateUsuarioAdmDto } from '../dto/update-Usuario-adm.dto';
import { PlanEntity } from 'src/plan/entities/plan.entity';
import { RutinasUsuarioRtaDto } from '../dto/rutinasUsuarioRtaDto';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(UsuarioEntity) private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(DatosPersonalesEntity)
    private readonly datosPersonalesRepository: Repository<DatosPersonalesEntity>,
    @InjectRepository(DatosFisicosEntity)
    private readonly datosFisicosRepository: Repository<DatosFisicosEntity>,
    @InjectRepository(RutinaEntity) private readonly rutinaRepository: Repository<RutinaEntity>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
    @InjectRepository(PlanEntity) private readonly planRepository: Repository<PlanEntity>,
    private readonly dataSource: DataSource,
    private readonly emailService: EmailService,
    private readonly planService: PlanService,
    private readonly fileImgService: FileImgService) { }

  //Crea un nuevo usuario, crea contraseña y envia el mail
  //Se puede llamar desde : login_perfil (suscripcion) o desde crudClientes
  public async createUsuario(body: CreateUsuarioDto): Promise<UsuarioRtaDto> {

    //se usa QueryRunner (otra forma de manejar transacciones), debido a que se juntan manejo de BD y envio de mails
    //es la forma mas segura de transaccion debido al esquema de BD (un id unico para las 3 tablas)
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //validar la existencia del plan, se llama al metodo de Plan.service. Devuelve null si no lo encuentra
      const unPlan = await this.planService.findOneById(body.datosPersonales.idPlan);
      if (!unPlan) {
        throw new ErrorManager("NOT_FOUND", `No existe el plan ${body.datosPersonales.idPlan}`);
      }

      //controlar que mail no exista
      const usuarioExistente = await this.findUsuarioByMail(body.datosBasicos.email);
      if (usuarioExistente) {
        throw new ErrorManager("BAD_REQUEST", `Mail existente no se puede crear el usuario. Estado de usuario: ${usuarioExistente.estado}`);
      }

      //Generar contraseña y encriptar
      const contrasenaGenerada = generateRandomPassword();
      const contrasenaHasheada = await bcrypt.hash(contrasenaGenerada, 10);

      const usuarioBasico = this.usuarioRepository.create({ ...body.datosBasicos, password: contrasenaHasheada }); //crea la instancia como si fuera un new UsuarioEntity, agrega el password
      const usuarioCreado = await queryRunner.manager.save(UsuarioEntity, usuarioBasico);

      if (usuarioCreado.rol === ROL.USUARIO) {
        //datos personales
        if (body.datosPersonales && Object.keys(body.datosPersonales).length > 0) {
          const datosPersonales = new DatosPersonalesEntity();
          datosPersonales.id = usuarioCreado.id; // compartir el mismo ID

          //convierte y valida fNacimiento
          if (body.datosPersonales.fNacimiento) {
            datosPersonales.fNacimiento = transformarFecha(body.datosPersonales.fNacimiento);
          }
          //SINO PONER UN WARNING

          //const { idPlan, ...restoDatos } = body.datosPersonales;
          const { idPlan, fNacimiento, ...restoDatos } = body.datosPersonales;//saca el dato idPlan y fNacimiento para que no se copie en datosPersonales en el Object.assign
          Object.assign(datosPersonales, restoDatos); // copiar propiedades en datosPersonales

          //agrega el plan
          datosPersonales.plan = unPlan;//agrego los datos del plan (relacion)
          usuarioCreado.datosPersonales = datosPersonales;
        }

        //datosFisicos
        if (body.datosFisicos && Object.keys(body.datosFisicos).length > 0) {
          const datosFisicos = new DatosFisicosEntity();
          datosFisicos.id = usuarioCreado.id;
          Object.assign(datosFisicos, body.datosFisicos);
          usuarioCreado.datosFisicos = datosFisicos;
        }

        // Se guarda el objeto completo, las relaciones se actualizarán en cascada.
        const usuarioFinal = await queryRunner.manager.save(UsuarioEntity, usuarioCreado);


        //confirma la transaccion
        await queryRunner.commitTransaction();
        const usuarioRtaDto = plainToInstance(UsuarioRtaDto, usuarioFinal);
        setImmediate(async () => {
          try {
            await this.emailService.enviarCredenciales(usuarioFinal.email, contrasenaGenerada);

          } catch (error) {
            // acá solo logueás el error, no afecta al flujo
            console.error("Error enviando mail:", error.message);
          }
        });
        return usuarioRtaDto;

      } else { // Si el rol no es USUARIO, solo se devuelve el usuario creado
        //envio de mail, si falla, lanza una excepcion y se hace rollback

        await queryRunner.commitTransaction();
        const usuarioRtaDto = plainToInstance(UsuarioRtaDto, usuarioCreado);
        setImmediate(async () => {
          try {
            await this.emailService.enviarCredenciales(usuarioCreado.email, contrasenaGenerada);

          } catch (error) {
            // acá solo logueás el error, no afecta al flujo
            console.error("Error enviando mail:", error.message);
          }
        });
        return usuarioRtaDto;
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw ErrorManager.handle(error);
    } finally {
      // Liberar el query runner
      await queryRunner.release();
    }
  }

  //devuelve todos los usuarios con datos basicos, fisicos y personales, incluso los "archivados" y los "inactivos"
  //se llama de crudeUsuario (admin)
  public async findAllUsuarios(): Promise<UsuarioDatosCompletosRtaDto[]> {
    try {
      const usuarios: UsuarioEntity[] = await this.usuarioRepository.find({
        //    where: {
        //  estado: Not(ESTADO.ARCHIVADO),
        // },
        relations: ['datosPersonales', 'datosPersonales.plan', 'datosFisicos'],
      }); //ojo, incluye los usuarios borrados

      if (usuarios.length === 0) {
        throw new ErrorManager("BAD_REQUEST", "No se encontró usuarios");
      }

      const usuariosDto = plainToInstance(UsuarioDatosCompletosRtaDto, usuarios);
      usuariosDto.forEach((usuario) => {
        if (usuario.datosPersonales?.imagenPerfil) {
          usuario.datosPersonales.imagenPerfil = this.fileImgService.construirUrlImagen(usuario.datosPersonales.imagenPerfil, "perfiles");
        }
      })

      return usuariosDto
    } catch (err) {
      throw ErrorManager.handle(err)
    }
  }

  //encuentra un usuario por id ( datos basicos, datos personales, datos fisicos y plan)
  //VER SI CONTROLO ACA SI ESTA BORRADO
  public async findUsuarioById(id: number): Promise<UsuarioRtaDto> {
    try {
      const unUsuario = await this.usuarioRepository.findOne({
        where: { id: id },
        relations: ['datosPersonales', 'datosFisicos', 'datosPersonales.plan']
      }); //ver si se agrega rutina
      if (!unUsuario) {
        throw new ErrorManager("NOT_FOUND", `Usuario con id ${id} no encontrado`)
      }
      const usuarioRtaDto = plainToInstance(UsuarioRtaDto, unUsuario);

      return usuarioRtaDto
    } catch (err) { throw ErrorManager.handle(err) }
  }


  //encuentra un usuario por mail (solo datos basicos)
  //se llama desde usuarioService.createUsuario (Se puede llamar  otro lado)
  public async findUsuarioByMail(mail: string): Promise<UsuarioEntity | null> { //retorna null si no encuentra el mail para crear unnuevo ususario
    try {

      const unUsuario = await this.usuarioRepository.findOneBy({ email: mail }); //necesito el null para usarlo en el createUsuario

      return unUsuario; //ojo puede estar borrado
    } catch (err) { throw ErrorManager.handle(err) }
  }

  public async findRutinasxId(id: number): Promise<RutinasUsuarioRtaDto[] | null> {
    const unUsuario = await this.usuarioRepository.findOneBy({ id: id });
    if (!unUsuario || unUsuario.estado === ESTADO.ARCHIVADO) {
      throw new ErrorManager("BAD_REQUEST", `No existe el usuario ${id} `);
    };
    const usuarioConRutinas = await this.usuarioRepository.find({
      where: { id: id },
      relations: ['rutinas']
    });
    console.log(usuarioConRutinas);
    if (usuarioConRutinas && usuarioConRutinas.length > 0 && usuarioConRutinas[0].rutinas) {
      const rutinasDto: RutinasUsuarioRtaDto[] = usuarioConRutinas[0].rutinas.map((r) => ({
        idUsuario: id,
        idRutina: r.idRutina,
        nombreRutina: r.nombreRutina,
        estadoRutina: r.estadoRutina

      }))
      console.log(rutinasDto);
      return rutinasDto
    } else return null
 
  }
  //Se llama desde el login (valida mail y contraseña)
  public async loginUsuario(body: LoginDto): Promise<LoginRtaDto> { //retorna null si no encuentra el mail para crear unnuevo ususario
    try {

      const unUsuario = await this.usuarioRepository.findOneBy({ email: body.email }); //necesito el null para usarlo en el createUsuario

      if (!unUsuario || unUsuario.estado === ESTADO.ARCHIVADO) {
        throw new ErrorManager('UNAUTHORIZED', 'Email incorrecto');
      }

      const passwordValida = await bcrypt.compare(body.password, unUsuario.password);
      if (!passwordValida) {
        throw new ErrorManager('UNAUTHORIZED', 'password incorrecta');
      }
      const usuarioRtaDto = plainToInstance(LoginRtaDto, unUsuario);
      //FALTA GENERAR EL TOKEN -


      return usuarioRtaDto;
    } catch (err) { throw ErrorManager.handle(err) }
  }

  //Actualiza todos los datos de un usuario.
  //se llama: desde perfil_usuario
  public async updateUsuario(id: number, body: UpdateUsuarioDto): Promise<UsuarioEntity> {
    try {
      const usuarioGuardado = await this.usuarioRepository.findOne({
        where: { id },
        relations: ['datosPersonales', 'datosFisicos', 'datosPersonales.plan'],
      });
      if (!usuarioGuardado) {
        throw new ErrorManager("NOT_FOUND", "No se encontro usuario");
      }
      if (usuarioGuardado.estado == ESTADO.ARCHIVADO) {
        throw new ErrorManager("BAD_REQUEST", "El usuario esta dado de baja");
      }
      if (body.datosBasicos && Object.keys(body.datosBasicos).length > 0) { //que no sea null o undefined y que no sea vacio
        if (body.datosBasicos.password) {
          usuarioGuardado.password = await bcrypt.hash(body.datosBasicos.password, 10);

          delete body.datosBasicos.password;
          setImmediate(async () => {
            try {
              await this.emailService.enviarCambioContrasena(usuarioGuardado.email);

            } catch (error) {
              // acá solo logueás el error, no afecta al flujo
              console.error("Error enviando mail:", error.message);
            }
          });

        }
        Object.assign(usuarioGuardado, body.datosBasicos);
      }
      if (body.datosPersonales && Object.keys(body.datosPersonales).length > 0) {
        if (!usuarioGuardado.datosPersonales) {
          // throw new ErrorManager("BAD_REQUEST", `el usuario ${usuarioGuardado.id} no tiene datos personales`);
          //mandar un warning NO TENIA DATOS PERSONALES
          usuarioGuardado.datosPersonales = new DatosPersonalesEntity;
        }
        if (body.datosPersonales.fNacimiento) {
          usuarioGuardado.datosPersonales.fNacimiento = transformarFecha(body.datosPersonales.fNacimiento);
        }


        if (body.datosPersonales.idPlan) {
          const planActualizado = await this.planService.findOneById(body.datosPersonales.idPlan);
          if (!planActualizado) {
            throw new ErrorManager("NOT_FOUND", `No se encontro el plan ${body.datosPersonales.idPlan}`);
          }
          usuarioGuardado.datosPersonales.plan = planActualizado;
          delete body.datosPersonales.idPlan; //elimina idPlan del body por las dudas (que no interfiera con la relacion con plan)
        }

        Object.assign(usuarioGuardado.datosPersonales, body.datosPersonales);
      }
      if (body.datosFisicos && Object.keys(body.datosFisicos).length > 0) {
        if (!usuarioGuardado.datosFisicos) {
          // throw new ErrorManager("BAD_REQUEST", `el usuario ${usuarioGuardado.id} no tiene datos fisicos`);
          usuarioGuardado.datosFisicos = new DatosFisicosEntity;
        }
        Object.assign(usuarioGuardado.datosFisicos, body.datosFisicos);
      }

      //no uso update porque tengo relaciones que guardar
      const usuarioUpdate = await this.usuarioRepository.save(usuarioGuardado);
      if (!usuarioUpdate) {
        throw new ErrorManager("BAD_REQUEST", `No se pudo actualizar los datos del usuario ${usuarioGuardado.id} `);
      }

      return usuarioUpdate
    } catch (err) {
      throw ErrorManager.handle(err)
    }
  }

  //se actualiza la imagen en un patch a parte
  //Se usa en modificar usurio (usuario)
  public async updateImagenPerfil(id: number, fileName: string): Promise<boolean> {
    try {
      let imagenVieja = "";
      const usuarioGuardado = await this.usuarioRepository.findOne({
        where: { id },
        relations: ['datosPersonales'],
      });
      if (!usuarioGuardado) {
        throw new ErrorManager("NOT_FOUND", "No se encontro usuario");
      }
      if (!usuarioGuardado.datosPersonales) {
        throw new ErrorManager("NOT_FOUND", "El usuario no tiene datos personales guardados");
      }

      if (usuarioGuardado.datosPersonales.imagenPerfil && usuarioGuardado.datosPersonales.imagenPerfil !== "usuario.png") {
        imagenVieja = usuarioGuardado.datosPersonales.imagenPerfil;
      }
      usuarioGuardado.datosPersonales.imagenPerfil = fileName;

      const usuarioUpdate = await this.usuarioRepository.save(usuarioGuardado);
      if (!usuarioUpdate) {
        throw new ErrorManager("BAD_REQUEST", `No se pudo actualizar los datos del usuario ${usuarioGuardado.id} `);
      }
      if (imagenVieja) {
        const imgBorrada = await this.fileImgService.borrarImagen(imagenVieja, "perfiles");
        if (imgBorrada) {
          console.log(`se borro la imagen de perfil anterior del usuario ${id}`);
        } else {
          console.log(`No existe la imagende perfil anterior del usuario ${id}`)
        }
      }
      return true;
    } catch (error) {
      throw ErrorManager.handle(error)
    }
  }

  //Actualiza todos los datos BASICOS de un usuario.
  //se llama: desde crud usuario (admin)
  public async updateUsuarioBasico(id: number, body: UpdateUsuarioAdmDto): Promise<UsuarioEntity> {
    try {

      return await this.entityManager.transaction(async (transaccion) => {
        const usuarioGuardado = await transaccion.findOne(UsuarioEntity, {
          where: { id },
          relations: ['datosPersonales', 'datosFisicos', 'datosPersonales.plan', 'rutinas'],
        });

        if (!usuarioGuardado) {
          throw new ErrorManager("NOT_FOUND", "No se encontro usuario");
        }
        // if (usuarioGuardado.estado == ESTADO.ARCHIVADO && !body.estado) {
        //   throw new ErrorManager("BAD_REQUEST", "El usuario esta dado de baja");
        // }

        if (body && Object.keys(body).length > 0) { //que no sea null o undefined y que no sea vacio
          if (body.email) {
            const unUsuario = await transaccion.findOne(UsuarioEntity, { where: { email: body.email } });
            if (unUsuario) {
              throw new ErrorManager("CONFLICT", `${body.email} ya existe en la base de datos`);
            }
            usuarioGuardado.email = body.email;
          }

          if (body.idPlan) {
            const unPlan = await transaccion.findOneBy(PlanEntity, { idPlan: body.idPlan })
            if (!unPlan) {
              throw new ErrorManager("BAD_REQUEST", `El plan ${body.idPlan} no existe`)
            }
            if (usuarioGuardado.datosPersonales) {
              usuarioGuardado.datosPersonales.plan = unPlan;
              //delete body.idPlan;
            }
          }

          if (body.estado) {
            if (usuarioGuardado.datosPersonales) {
              usuarioGuardado.datosPersonales.estado = body.estado
            }
            if (usuarioGuardado.datosFisicos) {
              usuarioGuardado.datosFisicos.estado = body.estado
            }

            if (usuarioGuardado.estado === ESTADO.ARCHIVADO && body.estado !== ESTADO.ARCHIVADO) { //pasa de borrado a no borrado
              usuarioGuardado.fBaja = null;
            }

            if (body.estado === ESTADO.ARCHIVADO && usuarioGuardado.estado !== ESTADO.ARCHIVADO) { //usuario es borrado
              throw new ErrorManager("BAD_REQUEST", "El nuevo estado no puede ser ARCHIVADO. PAra eliminar, ingresar por la opcion 'Eliminar'");
            }
            usuarioGuardado.estado = body.estado;

          }


          // Object.assign(usuarioGuardado, body);

          //no uso update porque tengo relaciones que guardar
          const usuarioUpdate = await transaccion.save(usuarioGuardado);

          return usuarioUpdate
        } else {
          throw new ErrorManager("BAD_REQUEST", "No se reciben datos para modificar usuario")
        }
      })


    } catch (err) {
      throw ErrorManager.handle(err)
    }
  }


  //baja logica de usuario
  //Se llama desde: crudUsuario (admin)
  public async deleteUsuario(id: number): Promise<boolean> {
    //devuelve el true si pudo hacer la baja logica o el error

    //Ver si borro las rutinas asociadas ahora o si hacemos un  (tarea programada) *******************************

    try {

      return await this.entityManager.transaction(async (transaccion) => {
        const usuarioGuardado = await transaccion.findOne(UsuarioEntity, {
          where: { id },
          relations: ['datosPersonales', 'datosFisicos', 'rutinas']
        });

        if (!usuarioGuardado) {
          throw new ErrorManager("NOT_FOUND", `No se encontro usuario ${id}`);
        }

        usuarioGuardado.estado = ESTADO.ARCHIVADO;
        usuarioGuardado.fBaja = new Date();
        if (usuarioGuardado.rol === ROL.USUARIO) {
          //ESTO EN REALIDAD NO ES UN ERROR YA QUE SE ESTA BORRANDO, PERO DEBERIA ENVIARSE UN MENSAJE WARNING
          if (!usuarioGuardado.datosPersonales) {
            throw new ErrorManager("NOT_FOUND", `El usuario ${id} no tiene datos personales`);
          }
          usuarioGuardado.datosPersonales.estado = ESTADO.ARCHIVADO;

          //ESTO EN REALIDAD NO ES UN ERROR YA QUE SE ESTA BORRANDO, PERO DEBERIA ENVIARSE UN MENSAJE WARNING
          if (!usuarioGuardado.datosFisicos) {
            throw new ErrorManager("NOT_FOUND", `El usuario ${id} no tiene datos fisicos`);
          }
          usuarioGuardado.datosFisicos.estado = ESTADO.ARCHIVADO;
        }

        // Borrado fisico las rutinas asociadas 
        if (usuarioGuardado.rutinas && usuarioGuardado.rutinas.length > 0) {
          await transaccion.remove(RutinaEntity, usuarioGuardado.rutinas);
        }

        //no uso update porque es mas seguro el save
        await transaccion.save(usuarioGuardado);

        return true; //si llegó hasta acá es porque salio bien
      });
    } catch (err) {
      throw ErrorManager.handle(err)
    }
  }



}
