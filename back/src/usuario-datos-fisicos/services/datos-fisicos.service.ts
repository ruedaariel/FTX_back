import { Injectable } from '@nestjs/common';
import { CreateDatosFisicosDto } from '../dto/create-datos-fisicos.dto';
import { UpdateDatosFisicosDto } from '../dto/update-datos-fisicos.dto';

@Injectable()
export class DatosFisicosService {
  create(createDatosFisicoDto: CreateDatosFisicosDto) {
    return 'This action adds a new datosFisico';
  }

  findAll() {
    return `This action returns all datosFisicos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datosFisico`;
  }

  update(id: number, updateDatosFisicoDto: UpdateDatosFisicosDto) {
    return `This action updates a #${id} datosFisico`;
  }

  remove(id: number) {
    return `This action removes a #${id} datosFisico`;
  }
}
