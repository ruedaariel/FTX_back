import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { UpdatePlanDto } from '../dto/update-plan.dto';
import { PlanEntity } from '../entities/plan.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ErrorManager } from 'src/config/error.manager';
import { DatosPersonalesEntity } from 'src/usuario-datos-personales/entities/datos-personales.entity';
import { ESTADO } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class PlanService {
  constructor(@InjectRepository(PlanEntity) private readonly planRepository: Repository<PlanEntity>,
    @InjectRepository(DatosPersonalesEntity) private readonly datosPersonalesRepository: Repository<DatosPersonalesEntity>,
    @InjectEntityManager() private readonly entityManager: EntityManager,) { }

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
        throw new ErrorManager("BAD_REQUEST", "La fecha de cambio de precio no es válida");
      }

      const planNuevo = this.planRepository.create({ ...planDto, fCambio: fechaValida });
      return await this.planRepository.save(planNuevo);
    } catch (error) {
      throw ErrorManager.handle(error);
    }
  }

  public async findAll(): Promise<PlanEntity[]> {
    return await this.planRepository.find();
  }

  public async findOneById(id: number): Promise<PlanEntity | null> {
    try {
      const unPlan = await this.planRepository.findOneBy({ idPlan: id });
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

  public async remove(id: number) {
    try {
      return await this.entityManager.transaction(async (transaccion) => {
        //valida si existe el plan
        const planExistente = await transaccion.findOneBy(PlanEntity,{ idPlan: id });
        if (!planExistente) {
          throw new ErrorManager("CONFLICT", `El plan ${id} no existe`);
        }

        //controla si hay usuarios activos vinculados al plan
        const usuariosActivos = await transaccion.count(DatosPersonalesEntity,{
          where: {
            plan: { idPlan: id },
            estado: ESTADO.ACTIVO,
          },
        });
        if (usuariosActivos > 0) {
          throw new ErrorManager("CONFLICT", `Existen ${usuariosActivos} activos con ese plan, no se puede eliminar el plan ${id}`)
        }

         //controla si hay usuarios inactivos vinculados al plan
        const usuariosInactivos = await transaccion.count(DatosPersonalesEntity,{ 
          where: {
            plan: { idPlan: id },
            estado: ESTADO.INACTIVO,
          },
        });
        if (usuariosInactivos > 0) {
          throw new ErrorManager("CONFLICT", `Existen ${usuariosInactivos} usuarios inactivos con ese plan, no se puede eliminar el plan ${id}. Se aconseja borrar a esos usuarios para dar de baja el plan`);
        }

        //desvincular la relacion si hay usuarios "archivados" (borrados)
        await transaccion.update(DatosPersonalesEntity,
          {
            plan: { idPlan: id },
            estado: ESTADO.ARCHIVADO,
          },
          { plan: undefined }
        );
        const resultado = await transaccion.delete(PlanEntity,id);

        return resultado.affected === 1

      });


    } catch (error) {
      throw ErrorManager.handle(error);
    }

  }
}
