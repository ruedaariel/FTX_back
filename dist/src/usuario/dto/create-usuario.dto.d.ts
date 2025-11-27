import { CreateUsuarioBasicoDto } from "./create-usuarioBasico.dto";
import { CreateDatosPersonalesDto } from "../../usuario-datos-personales/dto/create-datos-personales.dto";
import { CreateDatosFisicosDto } from "../../usuario-datos-fisicos/dto/create-datos-fisicos.dto";
export declare class CreateUsuarioDto {
    datosBasicos: CreateUsuarioBasicoDto;
    datosPersonales: CreateDatosPersonalesDto;
    datosFisicos: CreateDatosFisicosDto;
}
