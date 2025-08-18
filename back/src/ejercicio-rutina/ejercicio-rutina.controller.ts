import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EjercicioRutinaService } from './ejercicio-rutina.service';
import { CreateEjercicioRutinaDto } from './dto/create-ejercicio-rutina.dto';
import { UpdateEjercicioRutinaDto } from './dto/update-ejercicio-rutina.dto';

@Controller('ejercicio-rutina')
export class EjercicioRutinaController {
  constructor(private readonly ejercicioRutinaService: EjercicioRutinaService) {}

  @Post()
  create(@Body() createEjercicioRutinaDto: CreateEjercicioRutinaDto) {
    return this.ejercicioRutinaService.create(createEjercicioRutinaDto);
  }

  @Get()
  findAll() {
    return this.ejercicioRutinaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ejercicioRutinaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEjercicioRutinaDto: UpdateEjercicioRutinaDto) {
    return this.ejercicioRutinaService.update(+id, updateEjercicioRutinaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ejercicioRutinaService.remove(+id);
  }
}
