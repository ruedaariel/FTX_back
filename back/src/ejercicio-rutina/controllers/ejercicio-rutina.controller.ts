import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EjercicioRutinaService } from '../services/ejercicio-rutina.service';



@Controller('ejrutina')
export class EjercicioRutinaController {
  constructor(private readonly ejercicioRutinaService: EjercicioRutinaService) {}

  @Patch('update/:id')
  update(@Param('id',ParseIntPipe) id: number, @Body() body: {ejercicioHecho: boolean}) {
    return this.ejercicioRutinaService.updateEjHecho(id,body.ejercicioHecho);
  }

 
}
