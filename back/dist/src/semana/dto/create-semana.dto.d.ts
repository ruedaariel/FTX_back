import { ESTADOSEMANA } from "../entities/semana.entity";
import { CreateDiaDto } from "../../dia/dto/create-dia.dto";
export declare class CreateSemanaDto {
    nroSemana: string;
    estadoSemana: ESTADOSEMANA;
    dias?: CreateDiaDto[];
}
