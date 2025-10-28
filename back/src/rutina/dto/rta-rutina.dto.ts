import { PartialType } from '@nestjs/mapped-types';
import { CreateRutinaDto } from './create-rutina.dto';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ESTADORUTINA } from '../entities/rutina.entity';
import { RtaSemanaDto } from '../../semana/dto/rta-semana.dto';

export class RtaRutinaDto  {
        @Expose()
        idRutina: number;
    
        @Expose() 
        nombreRutina: string;
    
        @Expose()
        estadoRutina: ESTADORUTINA;
    
        @Exclude()
        fCreacionRutina: Date;
    
        @Exclude()
        fUltimoAccesoRutina: Date;
        
        @Exclude() //para borrado logico
        fBajaRutina: Date | null; //VER SI LO HACEMOS LOGICO
    
        @Expose()
        @Transform(({ obj }) => obj.usuario?.id ?? null)
        idUsuario: number|null;
    
        @Expose()
        @Type(() => RtaSemanaDto)
        semanas?:RtaSemanaDto[];
}
