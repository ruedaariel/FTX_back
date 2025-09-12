import { Injectable } from "@nestjs/common";
import { HistoricoPlanEntity } from "../entities/historico-plan.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateHistoricoPlanDto } from "../dto/create-historico-plan.dto";
import { ErrorManager } from "src/config/error.manager";

@Injectable()
export class PlanService {
    constructor(@InjectRepository(HistoricoPlanEntity) private readonly historicoPlanRepository: Repository<HistoricoPlanEntity>) { }

    public async create(planDto: CreateHistoricoPlanDto): Promise<HistoricoPlanEntity> {
        try {
            const historicoNuevo = this.historicoPlanRepository.create(planDto);
            return this.historicoPlanRepository.save(historicoNuevo);
        } catch (error) {
            throw ErrorManager.handle(error);
        }

    }
}