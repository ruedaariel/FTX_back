// export class CreateEjercicioRutinaDto {}

// En la carpeta src/ejercicio-rutina/dto/create-ejercicio-rutina.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  IsPositive,
} from 'class-validator';

export class CreateEjercicioRutinaDto {
  @IsString({ message: 'Las repeticiones deben ser un texto (ej: "4x12").' })
  @IsNotEmpty({ message: 'Las repeticiones no pueden estar vacías.' })
  @MaxLength(30, { message: 'Las repeticiones no deben exceder los 30 caracteres.' })
  readonly repeticiones: string;

  @IsString({ message: 'La dificultad debe ser un texto.' })
  @IsNotEmpty({ message: 'La dificultad no puede estar vacía.' })
  @MaxLength(30, { message: 'La dificultad no debe exceder los 30 caracteres.' })
  readonly dificultad: string;

  @IsNumber({}, { message: 'El peso debe ser un número.' })
  @IsPositive({ message: 'El peso debe ser un número positivo.' })
  @IsNotEmpty({ message: 'El peso no puede estar vacío.' })
  readonly peso: number;

  @IsString()
  @IsOptional() // Se marca como opcional porque en la entidad es nullable
  readonly observaciones?: string;

  @IsNumber({}, { message: 'El ID del día debe ser un número.' })
  @IsNotEmpty({ message: 'Debes proporcionar el ID del día.' })
  readonly diaId: number;

  @IsNumber({}, { message: 'El ID del ejercicio básico debe ser un número.' })
  @IsNotEmpty({ message: 'Debes proporcionar el ID del ejercicio básico.' })
  readonly ejercicioBasicoId: number;
}
