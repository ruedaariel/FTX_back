import { Module } from '@nestjs/common';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { DatosPersonalesEntity } from 'src/usuario-datos-personales/entities/datos-personales.entity';
import { DatosFisicosEntity } from 'src/usuario-datos-fisicos/entities/datos-fisicos.entity';
import { DatosFisicosModule } from 'src/usuario-datos-fisicos/usuario-datos-fisicos.module';
import { DatosPersonalesModule } from 'src/usuario-datos-personales/datos-personales.module';
import { PlanEntity } from 'src/plan/entities/plan.entity';
import { PlanModule } from 'src/plan/plan.module';



@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, DatosPersonalesEntity, DatosFisicosEntity, PlanEntity]), DatosFisicosModule,DatosPersonalesModule, PlanModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
