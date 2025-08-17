import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { EjercicioBasicoService } from '../services/ejercicio-basico.service';
import { CreateEjercicioBasicoDto } from '../dto/create-ejercicio-basico.dto';
import { UpdateEjercicioBasicoDto } from '../dto/update-ejercicio-basico.dto';
import { imagenEjercicioInterceptor } from 'src/interceptors/imagen-ejercicio.interceptor';



@Controller('ejbasico')
export class EjercicioBasicoController {
  constructor(private readonly ejercicioBasicoService: EjercicioBasicoService) { }
  
  @Post('register')
  @UseInterceptors(imagenEjercicioInterceptor()) //ver src/interceptors/imagen-interceptor
  async createEjercicioBasico(
    @UploadedFile() file: Express.Multer.File, // Aquí llega la imagen
    @Body() body: CreateEjercicioBasicoDto // Aquí llegan los datos del ejercicio (nombre, descripción, etc.)
  ) {
    body.imagenLink = file?.filename || null;
    return this.ejercicioBasicoService.createEjercicioBasico(body);
  }

  @Get('all')
  findAll() {
    return this.ejercicioBasicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ejercicioBasicoService.findOne(+id);
  }

  @Patch('update/:id')
  @UseInterceptors(imagenEjercicioInterceptor()) //ver src/interceptors/imagen-interceptor
  update(
    @Param('id') id: string,
    @Body() updateEjercicioBasicoDto: UpdateEjercicioBasicoDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file?.filename) {
      updateEjercicioBasicoDto.imagenLink = file?.filename;
    }
    return this.ejercicioBasicoService.update(+id, updateEjercicioBasicoDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ejercicioBasicoService.remove(id);
  }

  @Get('name/:name')
  findByName(@Param('name') nombreEj: string) {
    return this.ejercicioBasicoService.findByName(nombreEj);
  }

  @Get('existName/:name')
  existName(@Param('name') nombreEj: string) {
    return this.ejercicioBasicoService.existName(nombreEj);
  }


}
