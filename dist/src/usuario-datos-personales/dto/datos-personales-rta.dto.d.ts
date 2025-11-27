import { GENERO } from "../entities/datos-personales.entity";
import { ESTADO } from "../../constantes/estado.enum";
import { PlanRtaDto } from "../../plan/dto/plan-rta.dto";
export declare class DatosPersonalesRtaDto {
    id: number;
    nombre: string;
    apellido: string;
    dni: string;
    phone: string;
    genero: GENERO;
    plan: PlanRtaDto;
    fNacimiento: string;
    imagenPerfil: string;
    estado: ESTADO;
}
