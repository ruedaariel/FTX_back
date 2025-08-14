import { Module } from '@nestjs/common';
import { DatosPersonalesService } from './services/datos-personales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatosPersonalesEntity } from './entities/datos-personales.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DatosPersonalesEntity])],
  providers: [DatosPersonalesService],
  exports: [TypeOrmModule, DatosPersonalesService],
})
export class DatosPersonalesModule {}
