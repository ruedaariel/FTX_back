import { ESTADO } from "../../constantes/estado.enum";
import { IDatosFisicos } from "src/interfaces/datos-fisicos.interface";
export declare class DatosFisicosEntity implements IDatosFisicos {
    id: number;
    actividadDiaria: string;
    peso: number;
    estatura: number;
    metas: string;
    observaciones: string;
    estado: ESTADO;
}
