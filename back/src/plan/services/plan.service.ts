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
      //controlo que no exista plan con igual nombre
      const planExistente = await this.planRepository.findOneBy({ nombrePlan: planDto.nombrePlan });
      if (planExistente) {
        throw new ErrorManager("CONFLICT", `El nombre del plan ${planDto.nombrePlan} ya existe en la base de datos`)
      }

      //convercion de fecha y validacion
      const fechaValida = new Date(planDto.fCambio);
      if (isNaN(fechaValida.getTime())) {
        throw new ErrorManager("BAD_REQUEST","La fecha de cambio de precio no es válida");
      }

      const planNuevo = this.planRepository.create({...planDto, fCambio: fechaValida});
      return await this.planRepository.save(planNuevo);
    } catch (error) {
      throw ErrorManager.handle(error);
    }
  }

  public async findAll(): Promise<PlanEntity[]> {
    return await this.planRepository.find();
  }

  public async findOneById(id: number):Promise <PlanEntity | null> {
    try {
      const unPlan = await this.planRepository.findOneBy({idPlan:id});
      if (!unPlan) {
        return null
      }
      return unPlan;
    } catch (error) {
      throw ErrorManager.handle(error);
    }
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    //ACA HAY QUE AGREGAR EL HISTORICO
    return `This action updates a #${id} plan`;
  }

  remove(id: number) {
    //ACA TAMBIEN HAY QUE VER EL HISTORICO Y CONTROLAR  QUE NO HAYA USUARIOS CON PLANES ACTIVOS
    return `This action removes a #${id} plan`;
  }
}
