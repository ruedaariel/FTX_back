import { CreatePlanDto } from '../dto/create-plan.dto';
import { UpdatePlanDto } from '../dto/update-plan.dto';
import { PlanEntity } from '../entities/plan.entity';
import { EntityManager, Repository } from 'typeorm';
import { DatosPersonalesEntity } from '../../usuario-datos-personales/entities/datos-personales.entity';
import { CreateHistoricoPlanDto } from '../dto/create-historico-plan.dto';
import { HistoricoPlanEntity } from '../entities/historico-plan.entity';
import { PlanRtaCompletaDto } from '../dto/plan-rta-completa.dto';
export declare class PlanService {
    private readonly planRepository;
    private readonly datosPersonalesRepository;
    private readonly historicoPlanRepository;
    private readonly entityManager;
    constructor(planRepository: Repository<PlanEntity>, datosPersonalesRepository: Repository<DatosPersonalesEntity>, historicoPlanRepository: Repository<HistoricoPlanEntity>, entityManager: EntityManager);
    create(planDto: CreatePlanDto): Promise<PlanRtaCompletaDto>;
    findAll(): Promise<PlanRtaCompletaDto[]>;
    findOneById(id: number): Promise<PlanEntity | null>;
    update(id: number, updatePlanDto: UpdatePlanDto): Promise<PlanRtaCompletaDto>;
    remove(id: number): Promise<Boolean>;
    createHistorico(planDto: CreateHistoricoPlanDto): Promise<HistoricoPlanEntity>;
}
