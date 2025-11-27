import { ESTADORUTINA } from "../entities/rutina.entity";
import { CreateSemanaDto } from "../../semana/dto/create-semana.dto";
export declare class CreateRutinaDto {
    nombreRutina: string;
    estadoRutina: ESTADORUTINA;
    idUsuario?: number | null;
    semanas?: CreateSemanaDto[];
}
