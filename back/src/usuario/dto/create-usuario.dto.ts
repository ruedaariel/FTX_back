import { Type } from "class-transformer";
import {  ValidateNested } from "class-validator";
import { CreateUsuarioBasicoDto } from "./create-usuarioBasico.dto";
import { CreateDatosPersonalesDto } from "src/usuario-datos-personales/dto/create-datos-personales.dto";
import { CreateDatosFisicosDto } from "src/usuario-datos-fisicos/dto/create-datos-fisicos.dto";



export class CreateUsuarioDto {
   
@ValidateNested()
  @Type(() => CreateUsuarioBasicoDto)
  datosBasicos: CreateUsuarioBasicoDto;

  @ValidateNested()
  @Type(() => CreateDatosPersonalesDto)
  datosPersonales: CreateDatosPersonalesDto;

  @ValidateNested()
  @Type(() => CreateDatosFisicosDto)
 datosFisicos: CreateDatosFisicosDto;
}
