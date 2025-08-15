
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modulo-database/database.module';

import { UsuarioModule } from './usuario/usuario.module';
import { DatosPersonalesModule } from './usuario-datos-personales/datos-personales.module';
import { DatosFisicosModule } from './usuario-datos-fisicos/usuario-datos-fisicos.module';
import { EjercicioBasicoModule } from './ejercicio-basico/ejercicio-basico.module';




@Module({
  imports: [
    DatabaseModule,
   
    UsuarioModule,
   
    DatosPersonalesModule,
   
    DatosFisicosModule,
   
    EjercicioBasicoModule]

})
export class AppModule {
  
}
