
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modulo-database/database.module';

import { UsuarioModule } from './usuario/usuario.module';
import { DatosPersonalesModule } from './usuario-datos-personales/datos-personales.module';
import { DatosFisicosModule } from './usuario-datos-fisicos/usuario-datos-fisicos.module';
import { EjercicioBasicoModule } from './ejercicio-basico/ejercicio-basico.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';




@Module({
  imports: [
     ConfigModule.forRoot({
      envFilePath: `.${process.env.MODE_ENV || 'develope'}.env`,
      isGlobal: true,
    }),
    //para acceder a las imagenes con la ruta completa
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // Esto expone la carpeta en la URL
    }),

    DatabaseModule,
   
    UsuarioModule,
   
    DatosPersonalesModule,
   
    DatosFisicosModule,
   
    EjercicioBasicoModule]

})
export class AppModule {
  
}
