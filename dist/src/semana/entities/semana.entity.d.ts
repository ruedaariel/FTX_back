import { DiaEntity } from "../../dia/entities/dia.entity";
import { ISemana } from "src/interfaces/semana.interface";
import { RutinaEntity } from "../../rutina/entities/rutina.entity";
export declare enum ESTADOSEMANA {
    ENPROCESO = "en proceso",
    TERMINADA = "terminada",
    NOINICIADA = "no iniciada"
}
export declare class SemanaEntity implements ISemana {
    idSemana: number;
    nroSemana: string;
    estadoSemana: ESTADOSEMANA;
    rutina: RutinaEntity;
    dias: DiaEntity[];
}
