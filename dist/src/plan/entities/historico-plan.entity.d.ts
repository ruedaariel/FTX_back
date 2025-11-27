import { IHistoricoPlan } from "src/interfaces/historico-plan.interface";
import { PlanEntity } from "./plan.entity";
export declare class HistoricoPlanEntity implements IHistoricoPlan {
    idPlanHistorico: number;
    idPlanOrigen: number;
    nombrePlan: string;
    descripcion: string;
    beneficios: string;
    noIncluye: string;
    precio: number;
    level: number;
    fCambioInicio: Date;
    fCambioFin: Date;
    detalleCambio: string;
    plan?: PlanEntity | null;
}
