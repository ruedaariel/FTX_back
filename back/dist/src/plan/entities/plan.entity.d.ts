import { IPlan } from "src/interfaces/plan.interface";
import { DatosPersonalesEntity } from "../../usuario-datos-personales/entities/datos-personales.entity";
import { HistoricoPlanEntity } from "./historico-plan.entity";
export declare class PlanEntity implements IPlan {
    idPlan: number;
    nombrePlan: string;
    descripcion: string;
    beneficios: string;
    noIncluye: string;
    precio: number;
    level: number;
    fCambio: Date;
    datosPersonales: DatosPersonalesEntity[];
    historicoPlanes: HistoricoPlanEntity[];
}
