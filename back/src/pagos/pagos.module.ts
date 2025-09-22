import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagosController } from './controllers/pagos.controller';
import { PagoEntity } from './entity/pago.entity';
import { MercadoPagoService } from './services/mercadopago.service';
import { PagosService } from './services/pagos.service';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PagoEntity,UsuarioEntity])],
  controllers: [PagosController],
  providers: [PagosService, MercadoPagoService],
  exports: [PagosService],
})
export class PagosModule {}
