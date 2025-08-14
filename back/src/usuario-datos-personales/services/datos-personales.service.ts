import { Injectable } from '@nestjs/common';
import { CreateDatosPersonalesDto } from '../dto/create-datos-personales.dto';
import { UpdateDatosPersonalesDto } from '../dto/update-datos-personales.dto';

@Injectable()
export class DatosPersonalesService {
  create(createDatosPersonaleDto: CreateDatosPersonalesDto) {
    return 'This action adds a new datosPersonale';
  }

  findAll() {
    return `This action returns all datosPersonales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datosPersonale`;
  }

  update(id: number, updateDatosPersonaleDto: UpdateDatosPersonalesDto) {
    return `This action updates a #${id} datosPersonale`;
  }

  remove(id: number) {
    return `This action removes a #${id} datosPersonale`;
  }
}
