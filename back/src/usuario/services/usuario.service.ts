
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ESTADO, ROL, UsuarioEntity } from '../entities/usuario.entity';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { DeleteResult, Repository, FindOneOptions, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/config/error.manager';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { DatosPersonalesEntity } from 'src/usuario-datos-personales/entities/datos-personales.entity';
import { DatosFisicosEntity } from 'src/usuario-datos-fisicos/entities/datos-fisicos.entity';


@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(UsuarioEntity) private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(DatosPersonalesEntity)
    private readonly datosPersonalesRepository: Repository<DatosPersonalesEntity>,
    @InjectRepository(DatosFisicosEntity)
    private readonly datosFisicosRepository: Repository<DatosFisicosEntity>) { }

  public async createUsuario(body: CreateUsuarioDto): Promise<UsuarioEntity> {
    
    try {

      //controlar que mail no exista
      const usuarioExistente = await this.findUsuarioByMail(body.datosBasicos.email); //********************************************************** */

      if (!usuarioExistente) {
        const usuarioBasico = this.usuarioRepository.create(body.datosBasicos); //crea la instancia como si fuera un new UsuarioEntity
        const usuarioCreado = await this.usuarioRepository.save(usuarioBasico); //guarda para obtener el id que será usado para guardar el resto
        console.log("despues de save, id", usuarioCreado.id);
        if (!usuarioCreado || !usuarioCreado.id) { //es como precaucion, el save, si falla va al trycatch directo
          throw new ErrorManager("BAD_REQUEST", "No se guardo el usuario (basico)");
        }

        if (usuarioCreado.rol === ROL.USUARIO) {
          //datos personales
          if (body.datosPersonales && Object.keys(body.datosPersonales).length > 0) {
            const datosPersonales = new DatosPersonalesEntity();
            datosPersonales.id = usuarioCreado.id; // compartir el mismo ID
            Object.assign(datosPersonales, body.datosPersonales); // copiar propiedades en datosPersonales
            usuarioCreado.datosPersonales = datosPersonales;
          }
          //datos fisicos
          if (body.datosFisicos && Object.keys(body.datosFisicos).length > 0) {
            const datosFisicos = new DatosFisicosEntity();
            datosFisicos.id = usuarioCreado.id;
            Object.assign(datosFisicos, body.datosFisicos);
            usuarioCreado.datosFisicos = datosFisicos;
          }
        }
        const usuarioFinal = await this.usuarioRepository.save(usuarioCreado); //guarda todo (los datos basicos no se duplican)
        return usuarioFinal

      } else {
        throw new ErrorManager("BAD_REQUEST", `Mail existente no se puede crear el usuario. Estado de usuario: ${usuarioExistente.estado}`);
      }

    } catch (err) { throw ErrorManager.handle(err) }
  }

  //devuelve todos los usuarios con datos basicos, incluso los "archivados" y los "inactivos"
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

  //encuentra un usuario por id (solo datos basicos)
  public async findUsuarioById(id: number): Promise<UsuarioEntity> {
    try {
      const unUsuario = await this.usuarioRepository.findOneBy({ id: id });
      if (!unUsuario) {
        throw new ErrorManager("NOT_FOUND", `Usuario con id ${id} no encontrado`)

      }
      return unUsuario;   // controlar de donde se llama, puede ser que unUsuario esté borrado y no se deba enviar
    } catch (err) { throw ErrorManager.handle(err) }
  }

  public async findUsuarioByMail(mail: string): Promise<UsuarioEntity | null> { //retorna null si no encuentra el mail para crear unnuevo ususario
    try {

      const unUsuario = await this.usuarioRepository.findOneBy({ email: mail }); //necesito el null para usarlo en el createUsuario

      return unUsuario; //ojo puede estar borrado
    } catch (err) { throw ErrorManager.handle(err) }
  }

  public async updateUsuario(id: number, body: UpdateUsuarioDto): Promise<UsuarioEntity> {
    try {
      const usuarioGuardado = await this.usuarioRepository.findOne({
        where: { id },
        relations: ['datosPersonales', 'datosFisicos'],
      });
      if (!usuarioGuardado) {  //************************************************************************* */
        throw new ErrorManager("NOT_FOUND", "No se encontro usuario");
      }
      if (usuarioGuardado.estado == ESTADO.ARCHIVADO) { //************************************************ */
        throw new ErrorManager("BAD_REQUEST", "El usuario esta dado de baja");
      }
      if (body.datosBasicos && Object.keys(body.datosBasicos).length > 0) {
        Object.assign(usuarioGuardado, body.datosBasicos);
      }
      if (body.datosPersonales && Object.keys(body.datosPersonales).length > 0) {
        if (!usuarioGuardado.datosPersonales) {
         // throw new ErrorManager("BAD_REQUEST", `el usuario ${usuarioGuardado.id} no tiene datos personales`);
         usuarioGuardado.datosPersonales = new DatosPersonalesEntity;
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

  public async deleteUsuario(id: number): Promise<boolean> {
    //devuelve el true si pudo hacer la baja logica o el error
    try {
      const usuarioGuardado = await this.usuarioRepository.findOne({  
        where: { id },
      });

      if (!usuarioGuardado) { 
        throw new ErrorManager("NOT_FOUND", "No se encontro usuario");
      }

      usuarioGuardado.estado = ESTADO.ARCHIVADO;  //******************************* si saco el if me da error y yo ya se que no va a ser null */
      usuarioGuardado.fBaja = new Date();
      //no uso update porque es mas seguro el save
      const usuarioUpdate = await this.usuarioRepository.save(usuarioGuardado);
      //el if está de mas
      if (!usuarioUpdate) {
        throw new ErrorManager("BAD_REQUEST", `No se pudo actualizar los datos del usuario ${usuarioGuardado.id} `);
      }
      return true
    } catch (err) {
      throw ErrorManager.handle(err)

    }

  }

}
