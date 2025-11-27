import { ESTADOSEMANA } from "../entities/semana.entity";
import { RtaDiaDto } from "../../dia/dto/rta-dia.dto";
export declare class RtaSemanaDto {
    idSemana: number;
    nroSemana: string;
    estadoSemana: ESTADOSEMANA;
    dias?: RtaDiaDto[];
}
