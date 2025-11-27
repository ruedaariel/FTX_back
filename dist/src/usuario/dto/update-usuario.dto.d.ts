import { UpdateDatosPersonalesDto } from '../../usuario-datos-personales/dto/update-datos-personales.dto';
import { UpdateDatosFisicosDto } from '../../usuario-datos-fisicos/dto/update-datos-fisicos.dto';
import { UpdateUsuarioBasicoDto } from './update-usuarioBasico.dto';
export declare class UpdateUsuarioDto {
    datosBasicos?: UpdateUsuarioBasicoDto;
    datosPersonales?: UpdateDatosPersonalesDto;
    datosFisicos?: UpdateDatosFisicosDto;
}
