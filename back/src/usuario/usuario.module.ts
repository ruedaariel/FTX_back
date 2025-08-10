import { Module } from '@nestjs/common';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { DatosPersonalesEntity } from './datos-personales/entities/datos-personales.entity';
import { DatosFisicosEntity } from './datos-fisicos/entities/datos-fisicos.entity';


@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, DatosPersonalesEntity, DatosFisicosEntity])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
