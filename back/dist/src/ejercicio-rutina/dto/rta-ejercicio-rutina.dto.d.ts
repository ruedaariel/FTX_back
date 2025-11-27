import { RtaEjercicioBasicoDto } from "../../ejercicio-basico/dto/rta-ejercicio-basico.dto";
export declare class RtaEjercicioRutinaDto {
    idEjercicioRutina: number;
    repeticiones: string;
    dificultad: string;
    peso: number;
    observaciones: string;
    ejercicioHecho: boolean;
    ejercicioBasico: RtaEjercicioBasicoDto;
}
