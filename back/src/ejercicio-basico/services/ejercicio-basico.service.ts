import { Injectable } from '@nestjs/common';
import { CreateEjercicioBasicoDto } from '../dto/create-ejercicio-basico.dto';
import { UpdateEjercicioBasicoDto } from '../dto/update-ejercicio-basico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EjercicioBasicoEntity } from '../entities/ejercicio-basico.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from 'src/config/error.manager';

@Injectable()
export class EjercicioBasicoService {
  constructor(@InjectRepository(EjercicioBasicoEntity) private readonly ejercicioBasicoRepository: Repository<EjercicioBasicoEntity>) { }

  async createEjercicioBasico(ejercicioBasicoDto: CreateEjercicioBasicoDto) {
    try {
      const ejercicioGuardado =await this.findByName(ejercicioBasicoDto.nombreEjercicio);
      if (!ejercicioGuardado) {
        const nuevoEjercicioBasico = Object.assign(new EjercicioBasicoEntity(), ejercicioBasicoDto);
        const ejercicioCreado = await this.ejercicioBasicoRepository.save(nuevoEjercicioBasico);

        if (!ejercicioCreado) {
          throw new ErrorManager("BAD_REQUEST", "no se pudo crear ejercicio")
        }
        return ejercicioCreado
      } else {
        throw new ErrorManager("BAD_REQUEST","ya existe el mismo nombre de ejercicio")
      }

    } catch (err) {
      throw ErrorManager.handle(err);
    }

  }

  public async findByName(nombreEj: string): Promise<EjercicioBasicoEntity | null> {
    try {
      const unEjericio = await this.ejercicioBasicoRepository.findOneBy({ nombreEjercicio: nombreEj });
      return unEjericio;
    } catch (err) {
      throw ErrorManager.handle(err)
    }

  }

  findAll() {
    return `This action returns all ejercicioBasico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ejercicioBasico`;
  }

  update(id: number, updateEjercicioBasicoDto: UpdateEjercicioBasicoDto) {
    return `This action updates a #${id} ejercicioBasico`;
  }

  remove(id: number) {
    //Pensar si se hace fisico o logico, yo tomaria fisico, pero el problema qué pasa y ya está vinculado a una rutina
    return `This action removes a #${id} ejercicioBasico`;
  }
}
