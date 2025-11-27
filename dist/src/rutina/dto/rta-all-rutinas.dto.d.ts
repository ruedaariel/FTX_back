import { ESTADORUTINA } from "../entities/rutina.entity";
export declare class RtaAllRutinasDto {
    idRutina: number;
    nombreRutina: string;
    estadoRutina: ESTADORUTINA;
    idUsuario?: number | null;
    nombreUsuario: string;
}
