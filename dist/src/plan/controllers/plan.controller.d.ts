import { PlanService } from '../services/plan.service';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { UpdatePlanDto } from '../dto/update-plan.dto';
import { PlanRtaCompletaDto } from '../dto/plan-rta-completa.dto';
export declare class PlanController {
    private readonly planService;
    constructor(planService: PlanService);
    create(createPlanDto: CreatePlanDto): Promise<PlanRtaCompletaDto>;
    findAll(): Promise<PlanRtaCompletaDto[]>;
    findOne(id: number): PlanRtaCompletaDto;
    update(id: number, updatePlanDto: UpdatePlanDto): Promise<PlanRtaCompletaDto>;
    remove(id: number): Promise<Boolean>;
}
