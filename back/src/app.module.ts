
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modulo-database/database.module';

import { UsuarioModule } from './usuario/usuario.module';




@Module({
  imports: [
    DatabaseModule,
   
    UsuarioModule]

})
export class AppModule {
  
}
