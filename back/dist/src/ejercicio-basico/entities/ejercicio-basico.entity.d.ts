import { EjercicioRutinaEntity } from "../../ejercicio-rutina/entities/ejercicio-rutina.entity";
import { IEjercicioBasico } from "src/interfaces/ejercicio-basico";
export declare class EjercicioBasicoEntity implements IEjercicioBasico {
    idEjercicioBasico: number;
    nombreEjercicio: string;
    observaciones: string;
    imagenLink: string;
    videoLink: string;
    ejerciciosRutina: EjercicioRutinaEntity[];
}
