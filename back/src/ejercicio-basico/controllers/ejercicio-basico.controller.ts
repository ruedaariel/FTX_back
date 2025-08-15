import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EjercicioBasicoService } from '../services/ejercicio-basico.service';
import { CreateEjercicioBasicoDto } from '../dto/create-ejercicio-basico.dto';
import { UpdateEjercicioBasicoDto } from '../dto/update-ejercicio-basico.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';



@Controller('ejbasico')
export class EjercicioBasicoController {
  constructor(private readonly ejercicioBasicoService: EjercicioBasicoService) { }

  // @Post()
  // create(@Body() createEjercicioBasicoDto: CreateEjercicioBasicoDto) {
  //   return this.ejercicioBasicoService.create(createEjercicioBasicoDto);
  // }
  @Post('register')
  @UseInterceptors(FileInterceptor('imagenLink', {
    storage: diskStorage({
      destination: './uploads/ejercicios', // Carpeta donde se guarda la imagen
      filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname; // Evita nombres duplicados
        cb(null, uniqueName);
      }
    })
  }))
  async createEjercicioBasico(
    @UploadedFile() file: Express.Multer.File, // Aquí llega la imagen
    @Body() body: CreateEjercicioBasicoDto // Aquí llegan los datos del ejercicio (nombre, descripción, etc.)
    ) {
      body.imagenLink = file?.filename || null;
    return this.ejercicioBasicoService.createEjercicioBasico(body);
  }

  @Get()
  findAll() {
    return this.ejercicioBasicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ejercicioBasicoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEjercicioBasicoDto: UpdateEjercicioBasicoDto) {
    return this.ejercicioBasicoService.update(+id, updateEjercicioBasicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ejercicioBasicoService.remove(+id);
  }
}
