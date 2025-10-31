import { Exclude, Expose, Type } from "class-transformer";
import { DatosPersonalesRtaDto } from "../../usuario-datos-personales/dto/datos-personales-rta.dto";
import { DatosFisicosRtaDto } from "../../usuario-datos-fisicos/dto/datos-fisicos-rta.dto";

import { ESTADO } from "../../constantes/estado.enum";
import { ROL } from "src/constantes/rol";

export class UsuarioRtaDto {
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

    @Expose()
    @Type(() => DatosFisicosRtaDto)
    datosFisicos?: DatosFisicosRtaDto;
}
