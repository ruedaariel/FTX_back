

import { IsEmail, IsEnum, IsOptional, Matches, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';
import { UpdateDatosPersonaleDto } from '../datos-personales/dto/update-datos-personales.dto';
import { UpdateDatosFisicoDto } from '../datos-fisicos/dto/update-datos-fisicos.dto';

export class UpdateUsuarioDto {
  @ValidateNested()
  @Type(() => UpdateUsuarioDto)
  datosBasicos?: UpdateUsuarioDto;

  @ValidateNested()
  @Type(() => UpdateDatosPersonaleDto)
  datosPersonales?: UpdateDatosPersonaleDto;

  @ValidateNested()
  @Type(() => UpdateDatosFisicoDto)
  datosFisicos?: UpdateDatosFisicoDto;
}

