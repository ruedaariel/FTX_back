import { Exclude, Expose, Type } from "class-transformer";
import { DatosPersonalesRtaDto } from "src/usuario-datos-personales/dto/datos-personales-rta.dto";
import { DatosFisicosRtaDto } from "src/usuario-datos-fisicos/dto/datos-fisicos-rta.dto";
import { ROL } from "../entities/usuario.entity";
import { ESTADO } from "src/constantes/estado.enum";

export class UsuarioDatosPersonalesRtaDto {
    @Expose()
    id: number;
    
    @Expose()
    email: string;

    @Expose()
    rol: ROL; //ver si se deja

    @Expose()
    estado: ESTADO;

    @Exclude()
    password: string;

    @Exclude()
    fBaja: Date;

    @Exclude()
    fCreacion: Date;

    @Exclude()
    fUltimoAcceso: Date;

    @Expose()
    @Type(() => DatosPersonalesRtaDto)
    datosPersonales?: DatosPersonalesRtaDto;

}
