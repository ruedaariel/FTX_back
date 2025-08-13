import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ROL, UsuarioEntity } from '../entities/usuario.entity';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { DeleteResult, Repository, FindOneOptions, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/config/error.manager';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { DatosPersonalesEntity } from '../datos-personales/entities/datos-personales.entity';
import { DatosFisicosEntity } from '../datos-fisicos/entities/datos-fisicos.entity';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(UsuarioEntity) private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(DatosPersonalesEntity)
    private readonly datosPersonalesRepository: Repository<DatosPersonalesEntity>,
    @InjectRepository(DatosFisicosEntity)
    private readonly datosFisicosRepository: Repository<DatosFisicosEntity>) { }

  public async createUsuario(body: CreateUsuarioDto): Promise<UsuarioEntity> {
    // ver si no devuelve un ususrioRtaDto, para evitar datos sensibles .... OJOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    try {
      console.log("entre en service", body.datosBasicos.email);
      //CONTROLAR QUE NO SE REPITA EL MAIL, siempre me da error
      const usuarioExistente = await this.findUsuarioByMail(body.datosBasicos.email);
      console.log("usuarioexistente", usuarioExistente);
      if (!usuarioExistente) {
        const usuarioBasico = this.usuarioRepository.create(body.datosBasicos); //crea la instancia como si fuera un new UsuarioEntity
        const usuarioCreado = await this.usuarioRepository.save(usuarioBasico);
        console.log("despues de save, id", usuarioCreado.id);
        if (!usuarioCreado || !usuarioCreado.id) {
          throw new ErrorManager("BAD_REQUEST", "No se guardo el usuario (basico)");
        }

        //datos personales
        if (usuarioCreado.rol === ROL.USUARIO) {
          if (body.datosPersonales && Object.keys(body.datosPersonales).length > 0) {
            const datosPersonales = new DatosPersonalesEntity();
            datosPersonales.id = usuarioCreado.id; // compartir el mismo ID
            Object.assign(datosPersonales, body.datosPersonales); // copiar propiedades en datosPersonales

            /*         const datosPersonalesCreado = await this.datosPersonalesRepository.save(datosPersonales);
           console.log(datosPersonalesCreado.id, "id de datos personales despues de salvar");
                     console.log(datosPersonalesCreado);
                     if (!datosPersonalesCreado) {
                       throw new ErrorManager("BAD_REQUEST", `No se guardo el usuario (datospersonales) de ${usuarioCreado.id}`);
                     }
                     usuarioCreado.datosPersonales = datosPersonalesCreado; */
            usuarioCreado.datosPersonales = datosPersonales;
          }
          //pq usuariobasico tiene la relacion  con datos-personales
          if (body.datosFisicos && Object.keys(body.datosFisicos).length > 0) {
            const datosFisicos = new DatosFisicosEntity();
            datosFisicos.id = usuarioCreado.id;
            Object.assign(datosFisicos, body.datosFisicos);

            usuarioCreado.datosFisicos = datosFisicos; //pq usuariobasico tiene la relacion  con datos-personales
            /*        const datosFisicosCreado = await this.datosFisicosRepository.save(datosFisicos);
                   if (!datosFisicosCreado) {
                     throw new ErrorManager("BAD_REQUEST", `No se guardo los datos fisicos ${usuarioCreado.id}`);
                   } */
          }

        }

        const usuarioFinal = await this.usuarioRepository.save(usuarioCreado);
        //se suponia que al tenener cascade en tru en la entity de Usuario, se guardaba todo automaticamente
        //me andubo con uauarIO Y DatosPersonales, pero no me andubo cuando agregué los datosFisicos
        //return usuarioCreado;
        return usuarioFinal



      } else {
        throw new ErrorManager("BAD_REQUEST", "Mail existente no se puede crear el usuario");
      }

    } catch (err) { throw ErrorManager.handle(err) }
  }

  public async findAllUsuarios(): Promise<UsuarioEntity[]> {
    try {
      const usuarios: UsuarioEntity[] = await this.usuarioRepository.find();
      if (usuarios.length === 0) {
        throw new ErrorManager("BAD_REQUEST", "No se encontró ususarios");
      }
      return usuarios;
    } catch (err) {
      throw ErrorManager.handle(err)
    }
  }

  public async findUsuarioById(id: number): Promise<UsuarioEntity> {
    try {
      const unUsuario = await this.usuarioRepository.createQueryBuilder('usuario').where({ id }).getOne();
      if (!unUsuario) {
        throw new ErrorManager("BAD_REQUEST", `Usuario con id ${id} no encontrado`)

      }

      return unUsuario;
    } catch (err) { throw ErrorManager.handle(err) }
  }

  public async findUsuarioByMail(mail: string): Promise<UsuarioEntity | null> { //retorna null si no encuentra el mail para crear unnuevo ususario
    try {

      const unUsuario = await this.usuarioRepository.findOneBy({ email: mail });

      return unUsuario;
    } catch (err) { throw ErrorManager.handle(err) }
  }

  public async updateUsuario(id: number, body: UpdateUsuarioDto): Promise<UsuarioEntity> {
    try {
      const usuarioGuardado = await this.usuarioRepository.findOne({
        where: { id },
        relations: ['datosPersonales', 'datosFisicos'],
      });
      if (!usuarioGuardado) {
        throw new ErrorManager("BAD_REQUEST", "No se encontro usuario");
      }
      if (body.datosBasicos) {
        Object.assign(usuarioGuardado, body.datosBasicos);
      }
      if (body.datosPersonales) {
        if (!usuarioGuardado.datosPersonales) {
          throw new ErrorManager("BAD_REQUEST", `el usuario ${usuarioGuardado.id} no tiene datos personales`);
        }
        Object.assign(usuarioGuardado.datosPersonales, body.datosPersonales);
      }
      if (body.datosFisicos) {
        if (!usuarioGuardado.datosFisicos) {
          throw new ErrorManager("BAD_REQUEST", `el usuario ${usuarioGuardado.id} no tiene datos fisicos`);
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

  public async deleteUsuario(id: number): Promise<DeleteResult | undefined> {
    try {
      const deleteUsuario: DeleteResult = await this.usuarioRepository.delete(id)
      if (deleteUsuario.affected === 0) { //nunca da !updateUsuario siempre devuelve algo
        throw new ErrorManager("BAD_REQUEST", "no se pudo eliminar");
      }
      return deleteUsuario
    } catch (err) {
      throw ErrorManager.handle(err)
    }
  }

}


