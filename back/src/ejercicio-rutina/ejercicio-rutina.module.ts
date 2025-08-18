import { Module } from '@nestjs/common';
import { EjercicioRutinaService } from './ejercicio-rutina.service';
import { EjercicioRutinaController } from './ejercicio-rutina.controller';

@Module({
  controllers: [EjercicioRutinaController],
  providers: [EjercicioRutinaService],
})
export class EjercicioRutinaModule {}
