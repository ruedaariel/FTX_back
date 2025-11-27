"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanService = void 0;
const common_1 = require("@nestjs/common");
const plan_entity_1 = require("../entities/plan.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const error_manager_1 = require("../../config/error.manager");
const datos_personales_entity_1 = require("../../usuario-datos-personales/entities/datos-personales.entity");
const historico_plan_entity_1 = require("../entities/historico-plan.entity");
const estado_enum_1 = require("../../constantes/estado.enum");
const class_transformer_1 = require("class-transformer");
const plan_rta_dto_1 = require("../dto/plan-rta.dto");
const plan_rta_completa_dto_1 = require("../dto/plan-rta-completa.dto");
let PlanService = class PlanService {
    planRepository;
    datosPersonalesRepository;
    historicoPlanRepository;
    entityManager;
    constructor(planRepository, datosPersonalesRepository, historicoPlanRepository, entityManager) {
        this.planRepository = planRepository;
        this.datosPersonalesRepository = datosPersonalesRepository;
        this.historicoPlanRepository = historicoPlanRepository;
        this.entityManager = entityManager;
    }
    async create(planDto) {
        try {
            const planExistente = await this.planRepository.findOneBy({ nombrePlan: planDto.nombrePlan });
            if (planExistente) {
                throw new error_manager_1.ErrorManager("CONFLICT", `El nombre del plan ${planDto.nombrePlan} ya existe en la base de datos`);
            }
            const planNuevo = this.planRepository.create(planDto);
            const plan = await this.planRepository.save(planNuevo);
            return (0, class_transformer_1.plainToInstance)(plan_rta_completa_dto_1.PlanRtaCompletaDto, plan);
        }
        catch (error) {
            throw error_manager_1.ErrorManager.handle(error);
        }
    }
    async findAll() {
        const planes = await this.planRepository.find();
        return (0, class_transformer_1.plainToInstance)(plan_rta_completa_dto_1.PlanRtaCompletaDto, planes);
    }
    async findOneById(id) {
        try {
            const unPlan = await this.planRepository.findOneBy({ idPlan: id });
            if (!unPlan) {
                return null;
            }
            return unPlan;
        }
        catch (error) {
            throw error_manager_1.ErrorManager.handle(error);
        }
    }
    async update(id, updatePlanDto) {
        try {
            return await this.entityManager.transaction(async (transaccion) => {
                const planExistente = await transaccion.findOneBy(plan_entity_1.PlanEntity, { idPlan: id });
                if (!planExistente) {
                    throw new error_manager_1.ErrorManager("CONFLICT", `El plan ${id} no existe`);
                }
                const planViejo = { ...planExistente };
                let camposModif = [];
                Object.keys(updatePlanDto).forEach(clave => {
                    if (updatePlanDto[clave] !== undefined && updatePlanDto[clave] !== null) {
                        planExistente[clave] = updatePlanDto[clave];
                        camposModif.push(clave);
                    }
                });
                if (camposModif.length === 0) {
                    return planExistente;
                }
                const planActualizado = await transaccion.save(plan_entity_1.PlanEntity, planExistente);
                const historico = transaccion.create(historico_plan_entity_1.HistoricoPlanEntity, {
                    idPlanOrigen: planViejo.idPlan,
                    nombrePlan: planViejo.nombrePlan,
                    descripcion: planViejo.descripcion,
                    precio: planViejo.precio,
                    fCambioInicio: planViejo.fCambio,
                    detalleCambio: camposModif.join(';'),
                    beneficios: planViejo.beneficios,
                    plan: planExistente,
                    noIncluye: planViejo.noIncluye,
                    level: planViejo.level
                });
                await transaccion.save(historico_plan_entity_1.HistoricoPlanEntity, historico);
                return (0, class_transformer_1.plainToInstance)(plan_rta_dto_1.PlanRtaDto, planActualizado);
            });
        }
        catch (error) {
            throw error_manager_1.ErrorManager.handle(error);
        }
    }
    async remove(id) {
        try {
            return await this.entityManager.transaction(async (transaccion) => {
                const planExistente = await transaccion.findOneBy(plan_entity_1.PlanEntity, { idPlan: id });
                if (!planExistente) {
                    throw new error_manager_1.ErrorManager("CONFLICT", `El plan ${id} no existe`);
                }
                const usuariosActivos = await transaccion.count(datos_personales_entity_1.DatosPersonalesEntity, {
                    where: {
                        plan: { idPlan: id },
                        estado: estado_enum_1.ESTADO.ACTIVO,
                    },
                });
                if (usuariosActivos > 0) {
                    throw new error_manager_1.ErrorManager("CONFLICT", `Existen ${usuariosActivos} activos con ese plan, no se puede eliminar el plan ${id}`);
                }
                const usuariosInactivos = await transaccion.count(datos_personales_entity_1.DatosPersonalesEntity, {
                    where: {
                        plan: { idPlan: id },
                        estado: estado_enum_1.ESTADO.INACTIVO,
                    },
                });
                if (usuariosInactivos > 0) {
                    throw new error_manager_1.ErrorManager("CONFLICT", `Existen ${usuariosInactivos} usuarios inactivos con ese plan, no se puede eliminar el plan ${id}. Se aconseja borrar a esos usuarios para dar de baja el plan`);
                }
                await transaccion.update(datos_personales_entity_1.DatosPersonalesEntity, {
                    plan: { idPlan: id },
                    estado: estado_enum_1.ESTADO.ARCHIVADO,
                }, { plan: null });
                const historico = transaccion.create(historico_plan_entity_1.HistoricoPlanEntity, {
                    idPlanOrigen: planExistente.idPlan,
                    nombrePlan: planExistente.nombrePlan,
                    descripcion: planExistente.descripcion,
                    beneficios: planExistente.beneficios,
                    precio: planExistente.precio,
                    noIncluye: planExistente.noIncluye,
                    level: planExistente.level,
                    fCambioInicio: planExistente.fCambio,
                    detalleCambio: `Eliminación del plan ${planExistente.nombrePlan}, id: ${id}`,
                    plan: null
                });
                await transaccion.save(historico_plan_entity_1.HistoricoPlanEntity, historico);
                const resultado = await transaccion.delete(plan_entity_1.PlanEntity, id);
                return resultado.affected === 1;
            });
        }
        catch (error) {
            throw error_manager_1.ErrorManager.handle(error);
        }
    }
    async createHistorico(planDto) {
        try {
            const historicoNuevo = this.historicoPlanRepository.create(planDto);
            return this.historicoPlanRepository.save(historicoNuevo);
        }
        catch (error) {
            throw error_manager_1.ErrorManager.handle(error);
        }
    }
};
exports.PlanService = PlanService;
exports.PlanService = PlanService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(plan_entity_1.PlanEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(datos_personales_entity_1.DatosPersonalesEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(historico_plan_entity_1.HistoricoPlanEntity)),
    __param(3, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.EntityManager])
], PlanService);
//# sourceMappingURL=plan.service.js.map