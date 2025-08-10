import { IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
import { GENERO, PLAN } from "../entities/datos-personales.entity";

export class CreateDatosPersonalesDto {

  @IsEnum(PLAN, { message: 'El plan debe ser "basico", "pro" o "premium"' })
  plan: PLAN;

  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Matches(/^.{2,}$/, { message: 'El nombre debe tener al menos 2 caracteres' })
  nombre: string;

  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  @Matches(/^.{2,}$/, { message: 'El apellido debe tener al menos 2 caracteres' })
  apellido: string;

  @IsNotEmpty({ message: 'El DNI no puede estar vacío' })
  @Matches(/^\d{7,8}$/, { message: 'El DNI debe tener 7 u 8 dígitos numéricos' })
  dni: string;

  @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
  @Matches(/^\d{10}$/, { message: 'El teléfono debe tener exactamente 10 dígitos' })
  phone: string;

  @IsEnum(GENERO, { message: 'El género debe ser "hombre", "mujer" o "otro"' })
  genero: GENERO;

  @IsOptional()
  @IsString()
  imagenPerfil: string;
}

