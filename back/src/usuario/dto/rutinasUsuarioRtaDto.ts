import { ESTADORUTINA } from "src/rutina/entities/rutina.entity";

export interface RutinasUsuarioRtaDto {
    idUsuario: number;
    idRutina: number;
    nombreRutina: string;
    estadoRutina: ESTADORUTINA
}