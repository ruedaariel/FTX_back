import { Injectable } from '@nestjs/common';
import { CreateEjercicioRutinaDto } from './dto/create-ejercicio-rutina.dto';
import { UpdateEjercicioRutinaDto } from './dto/update-ejercicio-rutina.dto';

@Injectable()
export class EjercicioRutinaService {
  create(createEjercicioRutinaDto: CreateEjercicioRutinaDto) {
    return 'This action adds a new ejercicioRutina';
  }

  findAll() {
    return `This action returns all ejercicioRutina`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ejercicioRutina`;
  }

  update(id: number, updateEjercicioRutinaDto: UpdateEjercicioRutinaDto) {
    return `This action updates a #${id} ejercicioRutina`;
  }

  remove(id: number) {
    return `This action removes a #${id} ejercicioRutina`;
  }
}
