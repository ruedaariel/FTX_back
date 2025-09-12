import { Module } from '@nestjs/common';
import { PlanController } from './controllers/plan.controller';
import { PlanService } from './services/plan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from './entities/plan.entity';
import { DatosPersonalesEntity } from 'src/usuario-datos-personales/entities/datos-personales.entity';


@Module({
   imports: [TypeOrmModule.forFeature([PlanEntity,DatosPersonalesEntity])],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService],
})
export class PlanModule {}
