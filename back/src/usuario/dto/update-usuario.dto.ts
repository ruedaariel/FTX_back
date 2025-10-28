

import { IsEmail, IsEnum, IsOptional, Matches, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';
import { UpdateDatosPersonalesDto } from '../../usuario-datos-personales/dto/update-datos-personales.dto';
import { UpdateDatosFisicosDto } from '../../usuario-datos-fisicos/dto/update-datos-fisicos.dto';
import { UpdateUsuarioBasicoDto } from './update-usuarioBasico.dto';



export class UpdateUsuarioDto {
  @ValidateNested()
  @Type(() => UpdateUsuarioBasicoDto)
  datosBasicos?: UpdateUsuarioBasicoDto;

  @ValidateNested()
  @Type(() => UpdateDatosPersonalesDto)
  datosPersonales?: UpdateDatosPersonalesDto;

  @ValidateNested()
  @Type(() => UpdateDatosFisicosDto)
  datosFisicos?: UpdateDatosFisicosDto;
}

