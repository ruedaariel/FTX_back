import { DiaEntity } from "../../dia/entities/dia.entity";
import { EjercicioBasicoEntity } from "../../ejercicio-basico/entities/ejercicio-basico.entity";
import { IEjercicioRutina } from "src/interfaces/ejercicio-rutina.interface";
export declare class EjercicioRutinaEntity implements IEjercicioRutina {
    idEjercicioRutina: number;
    repeticiones: string;
    dificultad: string;
    peso: number;
    observaciones: string;
    ejercicioHecho: boolean;
    dia: DiaEntity;
    ejercicioBasico: EjercicioBasicoEntity;
}
