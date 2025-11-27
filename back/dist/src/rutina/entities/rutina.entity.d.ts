import { IRutina } from "src/interfaces/rutina.interface";
import { SemanaEntity } from "../../semana/entities/semana.entity";
import { UsuarioEntity } from "../../usuario/entities/usuario.entity";
export declare enum ESTADORUTINA {
    ACTIVA = "activa",
    FINALIZADA = "finalizada",
    PROXIMARUTINA = "proxima",
    ENPROCESO = "en proceso",
    COMPLETA = "completa"
}
export declare class RutinaEntity implements IRutina {
    idRutina: number;
    nombreRutina: string;
    estadoRutina: ESTADORUTINA;
    fCreacionRutina: Date;
    fUltimoAccesoRutina: Date;
    fBajaRutina: Date | null;
    usuario: UsuarioEntity | null;
    semanas: SemanaEntity[];
}
