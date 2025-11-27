import { ESTADORUTINA } from '../entities/rutina.entity';
import { RtaSemanaDto } from '../../semana/dto/rta-semana.dto';
export declare class RtaRutinaEstadisticaDto {
    idRutina: number;
    nombreRutina: string;
    estadoRutina: ESTADORUTINA;
    fCreacionRutina: Date;
    fUltimoAccesoRutina: Date;
    fBajaRutina: Date | null;
    idUsuario: number | null;
    semanas?: RtaSemanaDto[];
}
