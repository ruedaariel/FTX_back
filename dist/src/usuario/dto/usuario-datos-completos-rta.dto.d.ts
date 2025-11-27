import { DatosPersonalesRtaDto } from "../../usuario-datos-personales/dto/datos-personales-rta.dto";
import { DatosFisicosRtaDto } from "../../usuario-datos-fisicos/dto/datos-fisicos-rta.dto";
import { ESTADO } from "../../constantes/estado.enum";
import { ROL } from "src/constantes/rol";
export declare class UsuarioDatosCompletosRtaDto {
    id: number;
    email: string;
    rol: ROL;
    estado: ESTADO;
    password: string;
    level: number;
    passwordChangedAt: Date | null;
    fBaja: Date;
    fCreacion: Date;
    fUltimoAcceso: Date;
    datosPersonales?: DatosPersonalesRtaDto;
    datosFisicos?: DatosFisicosRtaDto;
    message: string;
}
