
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ROL, UsuarioEntity } from '../entities/usuario.entity';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { Repository, EntityManager, DataSource } from 'typeorm';
import { ErrorManager } from 'src/config/error.manager';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { DatosPersonalesEntity } from 'src/usuario-datos-personales/entities/datos-personales.entity';
import { DatosFisicosEntity } from 'src/usuario-datos-fisicos/entities/datos-fisicos.entity';
import { PlanService } from 'src/plan/services/plan.service';
import { ESTADO } from 'src/constantes/estado.enum';
import { RutinaEntity } from 'src/rutina/entities/rutina.entity';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { generateRandomPassword } from 'src/utils/random-password';
import { LoginDto } from '../dto/login.dto';
import { LoginRtaDto } from '../dto/login-rta.dto';

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
    private readonly dataSource: DataSource,
    private readonly emailService: EmailService,
    private readonly planService: PlanService) { }

  //Crea un nuevo usuario, crea contraseña y envia el mail
  //Se puede llamar desde : login_perfil (suscripcion) o desde crudClientes
  public async createUsuario(body: CreateUsuarioDto): Promise<UsuarioEntity> {
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

          const { idPlan, fNacimiento, ...restoDatos } = body.datosPersonales;//saca el dato idPlan y fNacimiento para que no se copie en datosPersonales en el Object.assign
          Object.assign(datosPersonales, restoDatos); // copiar propiedades en datosPersonales

          //convierte y valida fNaciiento
          if (body.datosPersonales.fNacimiento) {
            const fechaValida = new Date(body.datosPersonales.fNacimiento);
            if (!isNaN(fechaValida.getTime())) {
              datosPersonales.fNacimiento = fechaValida;
            }
          }//SINO PONER UN WARNING

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
        //envio de mail, si falla, lanza una excepcion y se hace rollback
        await this.emailService.enviarCredenciales(usuarioFinal.email, contrasenaGenerada);

        //confirma la transaccion
        await queryRunner.commitTransaction();
        return usuarioFinal;

      } else { // Si el rol no es USUARIO, solo se devuelve el usuario creado
        //envio de mail, si falla, lanza una excepcion y se hace rollback
        await this.emailService.enviarCredenciales(usuarioCreado.email, contrasenaGenerada);
        await queryRunner.commitTransaction();
        return usuarioCreado;
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw ErrorManager.handle(error);
    } finally {
      // Liberar el query runner
      await queryRunner.release();
    }
  }



  // try {
  //   //validar la existencia del plan, se llama al metodo de Plan.service. Devuelve null si no lo encuentra
  //   const unPlan = await this.planService.findOneById(body.datosPersonales.idPlan);
  //   if (!unPlan) {
  //     throw new ErrorManager("NOT_FOUND", `No existe el plan ${body.datosPersonales.idPlan}`);
  //   }

  //   //controlar que mail no exista
  //   const usuarioExistente = await this.findUsuarioByMail(body.datosBasicos.email);

  //   if (usuarioExistente) {
  //     throw new ErrorManager("BAD_REQUEST", `Mail existente no se puede crear el usuario. Estado de usuario: ${usuarioExistente.estado}`);
  //   }
  //   const usuarioBasico = this.usuarioRepository.create(body.datosBasicos); //crea la instancia como si fuera un new UsuarioEntity
  //   const usuarioCreado = await this.usuarioRepository.save(usuarioBasico); //guarda para obtener el id que será usado para guardar el resto

  //   if (!usuarioCreado || !usuarioCreado.id) { //es como precaucion, el save, si falla va al trycatch directo
  //     throw new ErrorManager("BAD_REQUEST", "No se guardo el usuario (basico)");
  //   }

  //   if (usuarioCreado.rol === ROL.USUARIO) {
  //     //datos personales
  //     if (body.datosPersonales && Object.keys(body.datosPersonales).length > 0) {
  //       const datosPersonales = new DatosPersonalesEntity();
  //       datosPersonales.id = usuarioCreado.id; // compartir el mismo ID

  //       const { idPlan, fNacimiento, ...restoDatos } = body.datosPersonales;//saca el dato idPlan y fNacimiento para que no se copie en datosPersonales en el Object.assign
  //       Object.assign(datosPersonales, restoDatos); // copiar propiedades en datosPersonales
  //       if (body.datosPersonales.fNacimiento) {
  //         const fechaValida = new Date(body.datosPersonales.fNacimiento);
  //         if (!isNaN(fechaValida.getTime())) {
  //           datosPersonales.fNacimiento = fechaValida;
  //         }
  //       }//SINO PONER UN WARNING
  //       datosPersonales.plan = unPlan;//agrego los datos del plan (relacion)
  //       usuarioCreado.datosPersonales = datosPersonales;


  //     }
  //     //datos fisicos
  //     if (body.datosFisicos && Object.keys(body.datosFisicos).length > 0) {
  //       const datosFisicos = new DatosFisicosEntity();
  //       datosFisicos.id = usuarioCreado.id;
  //       Object.assign(datosFisicos, body.datosFisicos);
  //       usuarioCreado.datosFisicos = datosFisicos;
  //     }

  //     const usuarioFinal = await this.usuarioRepository.save(usuarioCreado); //guarda todo (los datos basicos no se duplican)
  //     return usuarioFinal
  //   } else {
  //     return usuarioCreado
  //   }
  // } catch (err) { throw ErrorManager.handle(err) }

  //devuelve todos los usuarios con datos basicos, incluso los "archivados" y los "inactivos"
  //se llama de crudeUsuario (admin)
  public async findAllUsuarios(): Promise<UsuarioEntity[]> {
    try {
      const usuarios: UsuarioEntity[] = await this.usuarioRepository.find(); //ojo, incluye los usuarios borrados
      if (usuarios.length === 0) {
        throw new ErrorManager("BAD_REQUEST", "No se encontró ususarios");
      }
      return usuarios;
    } catch (err) {
      throw ErrorManager.handle(err)
    }
  }

  //encuentra un usuario por id ( datos basicos, datos personales, datos fisicos y plan)
  //VER SI CONTROLO ACA SI ESTA BORRADO
  public async findUsuarioById(id: number): Promise<UsuarioEntity> {
    try {
      const unUsuario = await this.usuarioRepository.findOne({
        where: { id: id },
        relations: ['datosPersonales', 'datosFisicos', 'datosPersonales.plan']
      }); //ver si se agrega rutina
      if (!unUsuario) {
        throw new ErrorManager("NOT_FOUND", `Usuario con id ${id} no encontrado`)

      }
      return unUsuario;   // controlar de donde se llama, puede ser que unUsuario esté borrado y no se deba enviar
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

      //FALTA GENERAR EL TOKEN
      const rtaUsuario: LoginRtaDto = {
        id: unUsuario.id,
        email: unUsuario.email,
        rol: unUsuario.rol,
        estado: unUsuario.estado,
        //  token: tokenGenerado, 
      };

      return rtaUsuario; 
    } catch (err) { throw ErrorManager.handle(err) }
  }
  //Actualiza todos los datos de un usuario.
  //se llama: desde perfil_usuario y crudUsuario
  public async updateUsuario(id: number, body: UpdateUsuarioDto): Promise<UsuarioEntity> {
    try {
      const usuarioGuardado = await this.usuarioRepository.findOne({
        where: { id },
        relations: ['datosPersonales', 'datosFisicos', 'datosPersonales.plan'], // AGREGAR LO DEL PLAN
      });
      if (!usuarioGuardado) {
        throw new ErrorManager("NOT_FOUND", "No se encontro usuario");
      }
      if (usuarioGuardado.estado == ESTADO.ARCHIVADO) {
        throw new ErrorManager("BAD_REQUEST", "El usuario esta dado de baja");
      }
      if (body.datosBasicos && Object.keys(body.datosBasicos).length > 0) {
        Object.assign(usuarioGuardado, body.datosBasicos);
      }
      if (body.datosPersonales && Object.keys(body.datosPersonales).length > 0) {
        if (!usuarioGuardado.datosPersonales) {
          // throw new ErrorManager("BAD_REQUEST", `el usuario ${usuarioGuardado.id} no tiene datos personales`);
          //mandar un warning NO TENIA DATOS PERSONALES
          usuarioGuardado.datosPersonales = new DatosPersonalesEntity;
        }

        if (body.datosPersonales.fNacimiento) {
          const fechaValida = new Date(body.datosPersonales.fNacimiento);
          if (!isNaN(fechaValida.getTime())) {
            usuarioGuardado.datosPersonales.fNacimiento = fechaValida;
          }
          //MANDAR UN WARNING  si la fecha de nac es incorrecta
          delete body.datosPersonales.fNacimiento;
        }
        //ACA VER LO DE PLAN, llamar a plan.service para que maneje el cambio de plan (si es que lo hubo)
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
