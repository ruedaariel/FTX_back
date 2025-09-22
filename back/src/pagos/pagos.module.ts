import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagosController } from './controllers/pagos.controller';
import { PagoEntity } from './entity/pago.entity';
import { MercadoPagoService } from './services/mercadopago.service';
import { PagosService } from './services/pagos.service';
<<<<<<< HEAD

@Module({
  imports: [TypeOrmModule.forFeature([PagoEntity])],
=======
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PagoEntity,UsuarioEntity])],
>>>>>>> 5f0534733a3cb264e09cb4eda36bb2423154afc5
  controllers: [PagosController],
  providers: [PagosService, MercadoPagoService],
  exports: [PagosService],
})
<<<<<<< HEAD
export class PagosModule {}
=======
export class PagosModule {}
>>>>>>> 5f0534733a3cb264e09cb4eda36bb2423154afc5
