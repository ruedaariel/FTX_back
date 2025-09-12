import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Matches, Min } from "class-validator";
import { GENERO } from "../entities/datos-personales.entity";


export class CreateDatosPersonalesDto {

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

  @IsNotEmpty()
  @IsInt()
  @Min(1, { message: 'El id del plan debe ser mayor a 0' })
  idPlan: number;

  @IsNotEmpty({ message: 'La fecha de nacimiento no debe ser vacia' })
  @IsDateString()
  fNacimiento: string;

  @IsOptional()
  @IsString()
  imagenPerfil: string;
}

