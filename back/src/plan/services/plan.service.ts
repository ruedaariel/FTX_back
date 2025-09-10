import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { UpdatePlanDto } from '../dto/update-plan.dto';
import { PlanEntity } from '../entities/plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorManager } from 'src/config/error.manager';

@Injectable()
export class PlanService {
  constructor(@InjectRepository(PlanEntity) private readonly planRepository: Repository<PlanEntity>) { }

  public async create(planDto: CreatePlanDto): Promise<PlanEntity> {
    try {
      const planExistente = await this.planRepository.findOneBy({ nombrePlan: planDto.nombrePlan });
      if (planExistente) {
        throw new ErrorManager("CONFLICT", `El nombre del plan ${planDto.nombrePlan} ya existe en la base de datos`)
      }

      //convercion de fecha y validacion
      const fechaValida = new Date(planDto.fCambioPrecio);
      if (isNaN(fechaValida.getTime())) {
        throw new ErrorManager("BAD_REQUEST","La fecha de cambio de precio no es válida");
      }

      const planNuevo = this.planRepository.create({...planDto, fCambioPrecio: fechaValida});
      return await this.planRepository.save(planNuevo);
    } catch (error) {
      throw ErrorManager.handle(error);
    }
  }

  findAll(): Promise<PlanEntity[]> {
    return this.planRepository.find({where:{}});//ver como almaceno el historico
  }

  findOne(id: number) {
    return `This action returns a #${id} plan`;
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return `This action updates a #${id} plan`;
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
