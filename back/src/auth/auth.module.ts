import { Global, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { PagoEntity } from 'src/pagos/entity/pago.entity';

//se usa en todos lados, para no declararlo, lo defino global, ojo no hay que abusar
@Global()
@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity,PagoEntity]),],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
