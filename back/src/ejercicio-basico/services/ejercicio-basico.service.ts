import { Injectable } from '@nestjs/common';
import { CreateEjercicioBasicoDto } from '../dto/create-ejercicio-basico.dto';
import { UpdateEjercicioBasicoDto } from '../dto/update-ejercicio-basico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EjercicioBasicoEntity } from '../entities/ejercicio-basico.entity';
import { Not, Repository } from 'typeorm';
import { ErrorManager } from 'src/config/error.manager';
import * as path from 'path';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { normalizarSinEspacios } from 'src/utils/normalizar-string';


@Injectable()
export class EjercicioBasicoService {

  constructor(@InjectRepository(EjercicioBasicoEntity) private readonly ejercicioBasicoRepository: Repository<EjercicioBasicoEntity>, private readonly configService: ConfigService) { }

  async createEjercicioBasico(ejercicioBasicoDto: CreateEjercicioBasicoDto) {
    try {
      //controlo si ya existe
      const ejercicioGuardado = await this.existName(ejercicioBasicoDto.nombreEjercicio);

      if (!ejercicioGuardado) {
        //se guarda y se controla si se creo
        const nuevoEjercicioBasico = Object.assign(new EjercicioBasicoEntity(), ejercicioBasicoDto);
        const ejercicioCreado = await this.ejercicioBasicoRepository.save(nuevoEjercicioBasico);
        if (!ejercicioCreado) {
          throw new ErrorManager("BAD_REQUEST", "no se pudo crear ejercicio")
        }
        //para ver que trae
        ejercicioCreado.imagenLink = this.construirUrlImagen(ejercicioCreado.imagenLink);
        return ejercicioCreado //es enviado con solo el nombre de la imagen, no la url completa
      } else {
        throw new ErrorManager("BAD_REQUEST", "ya existe el mismo nombre de ejercicio")
      }

    } catch (err) {
      throw ErrorManager.handle(err);
    }

  }

  public async findByName(nombreEj: string): Promise<EjercicioBasicoEntity> {
    try {

      const unEjercicio = await this.ejercicioBasicoRepository.findOne({ where: { nombreEjercicio: normalizarSinEspacios(nombreEj) }, });

      if (!unEjercicio) {
        throw new ErrorManager("BAD_REQUEST", `no se encontró ejercicio con nombre ${nombreEj}`);
      }
      unEjercicio.imagenLink = this.construirUrlImagen(unEjercicio.imagenLink);
      return unEjercicio;
    } catch (err) {
      throw ErrorManager.handle(err)
    }

  }

  public async existName(nombreEj: string): Promise<boolean> {
    try {
      const unEjercicio = await this.ejercicioBasicoRepository.findOne({ where: { nombreEjercicio: normalizarSinEspacios(nombreEj) }, });
      if (!unEjercicio) {
        return false;
      }
      return true;
    } catch (err) {
      throw ErrorManager.handle(err)
    }

  }

  public async remove(id: number): Promise<boolean> {
    //borra el ejercicio (hard delete) pero deberia primero verificar si no existe algun ejercicioRutina que esté relacionado con este ejercicio
    //en ese caso, no deberia dejarlo borrar
    try {
      //controlo que exista
      const ejercicioGuardado = await this.ejercicioBasicoRepository.findOneBy({ idEjercicioBasico: id });
      if (!ejercicioGuardado) {
        throw new ErrorManager("BAD_REQUEST", "No se encontro el ejercicio");
      }

      //borro el ejercicio
      const ejercicioBorrado = await this.ejercicioBasicoRepository.delete({ idEjercicioBasico: id });
      if (ejercicioBorrado.affected === 0) {
        throw new ErrorManager("BAD_REQUEST", "No se borro el ejercicio");
      }

      //borro la imagen del ejercicio de uploads/ejercicios
      if (ejercicioGuardado.imagenLink) {
        const imgBorrada = await this.borrarImagen(ejercicioGuardado.imagenLink);
        if (imgBorrada) {
          console.log(`se borro la imagen del ejercicio ${id}, ${ejercicioGuardado.imagenLink}`);
        } else {
          console.log(`No existe la imagen ${ejercicioGuardado.imagenLink}`)
        }
      }

      return true;
    } catch (err) {
      throw ErrorManager.handle(err);
    }
    //el borrado es fisico, pero si esta conectado a rutina, no se podrá borrar. Cuanto se establezcan las relaciones, hacer.
  }

  public async findOne(id: number): Promise<EjercicioBasicoEntity> {
    try {
      const unEjercicio = await this.ejercicioBasicoRepository.findOneBy({ idEjercicioBasico: id });
      if (!unEjercicio) {
        throw new ErrorManager("BAD_REQUEST", `No se encontro el ejercicio id ${id}`);
      }
      //ojo, recordar que estoy modificando el campo imagenLink, aunque NO en la b/d
      unEjercicio.imagenLink = this.construirUrlImagen(unEjercicio.imagenLink);
      return unEjercicio;
    } catch (err) {
      throw ErrorManager.handle(err);
    }
  }

  public async findAll(): Promise<EjercicioBasicoEntity[]> {
    try {
      const ejercicios = await this.ejercicioBasicoRepository.find();
      //ojo, recordar que estoy modificando el campo imagenLink, aunque NO en la b/d
      ejercicios.forEach(ej => { ej.imagenLink = this.construirUrlImagen(ej.imagenLink); });
      return ejercicios;
    } catch (err) {
      throw ErrorManager.handle(err);
    }

  }



  public async update(id: number, updateEjercicioBasicoDto: UpdateEjercicioBasicoDto): Promise<EjercicioBasicoEntity> {
    try {
      //busco el ejercicio a actualizar
      const ejercicioGuardado = await this.ejercicioBasicoRepository.findOneBy({ idEjercicioBasico: id });
      if (!ejercicioGuardado) {
        throw new ErrorManager("BAD_REQUEST", `No se encuentra ejercicio id ${id}`);
      }

      //si modifico el nombre, busco que no exista otro con el mismo nombre
      if (updateEjercicioBasicoDto.nombreEjercicio) {
        const ejercicioControl = await this.ejercicioBasicoRepository.findOne({
          where:
            { nombreEjercicio: updateEjercicioBasicoDto.nombreEjercicio, idEjercicioBasico: Not(id), } //como estoy actualizando busco si ya existe este nuevo nombre, pero que sea de distinto id
        });
        if (ejercicioControl) {
          throw new ErrorManager("BAD_REQUEST", "Nombre del ejercicio duplicado");
        }
      };

      //si modifico la imagen, debo borrar la imagen anterior
      let borrarImg: boolean = false;
      let nombreImgAborrar = "";
      if (updateEjercicioBasicoDto.imagenLink && ejercicioGuardado.imagenLink &&
        updateEjercicioBasicoDto.imagenLink !== ejercicioGuardado.imagenLink) {
          nombreImgAborrar=ejercicioGuardado.imagenLink
        borrarImg = true
      };

      //comienzo el update
      Object.assign(ejercicioGuardado, updateEjercicioBasicoDto);
      const ejercicioModif = await this.ejercicioBasicoRepository.save(ejercicioGuardado);
      if (!ejercicioModif) {
        throw new ErrorManager("BAD_REQUEST", `No se pudo guardar la modificacion del ejercicio id ${id}`);
      }
      //ya modifiqué el ejercicio ->borro la imagen vieja
      if (borrarImg) {
        const imgBorrada = await this.borrarImagen(nombreImgAborrar);
        if (imgBorrada) {
          console.log(`se borro la imagen del ejercicio ${id}, ${ejercicioGuardado.imagenLink}`);
        } else {
          console.log(`No existe la imagen ${ejercicioGuardado.imagenLink}`)
        }
      }
      return ejercicioModif;
    } catch (err) {
      throw ErrorManager.handle(err);
    }
  }

  private construirUrlImagen(nombreArchivo: string): string {
    //para mandar al front, construyo la ruta+nombreArchivo
    const port = this.configService.get<string>('PORT') || '8000';
    const host = this.configService.get<string>('HOST') || 'localhost';
    const baseUrl = `http://${host}:${port}/uploads/ejercicios/`;
    return nombreArchivo ? baseUrl + nombreArchivo : "";
  }

  private async borrarImagen(nombreArchivo: string): Promise<boolean> {
    //true: si se borra
    //false si no existe el nombre
    //error si no lo puede borrar (x causa)

    if (nombreArchivo) {

      const rutaBaseProyecto = process.cwd();
      const rutaImagen = path.join(rutaBaseProyecto, 'uploads', 'ejercicios', nombreArchivo);

      try {
        await fs.promises.unlink(rutaImagen);
        return true;
      } catch (err) {
        throw ErrorManager.handle(err);
      }
    }
    return false;
  }

}
