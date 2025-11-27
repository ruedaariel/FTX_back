import { EjercicioRutinaEntity } from "../../ejercicio-rutina/entities/ejercicio-rutina.entity";
import { IDia } from "src/interfaces/dia.interface";
import { SemanaEntity } from "../../semana/entities/semana.entity";
export declare class DiaEntity implements IDia {
    idDia: number;
    nroDia: string;
    focus: string;
    semana: SemanaEntity;
    ejerciciosRutina: EjercicioRutinaEntity[];
}
