import { Module } from '@nestjs/common';
import { RutinaController } from './controllers/rutina.controller';
import { RutinaService } from './services/rutina.service';
import { RutinaEntity } from './entities/rutina.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { EjercicioBasicoEntity } from 'src/ejercicio-basico/entities/ejercicio-basico.entity';


@Module({
  imports: [TypeOrmModule.forFeature([RutinaEntity,UsuarioEntity,EjercicioBasicoEntity]), UsuarioModule],
  controllers: [RutinaController],
  providers: [RutinaService],
})
export class RutinaModule {}
