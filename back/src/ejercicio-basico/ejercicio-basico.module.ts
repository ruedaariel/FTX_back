import { Module } from '@nestjs/common';
import { EjercicioBasicoController } from './controllers/ejercicio-basico.controller';
import { EjercicioBasicoService } from './services/ejercicio-basico.service';
import { EjercicioBasicoEntity } from './entities/ejercicio-basico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([EjercicioBasicoEntity])],
  controllers: [EjercicioBasicoController],
  providers: [EjercicioBasicoService],
})
export class EjercicioBasicoModule {}
