// export class CreateSemanaDto {}

// En la carpeta src/semana/dto/create-semana.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumber,
  Length,
} from 'class-validator';
import { ESTADOSEMANA } from '../entities/semana.entity';

export class CreateSemanaDto {
  @IsString({ message: 'El número de semana debe ser un texto.' })
  @IsNotEmpty({ message: 'El número de semana no puede estar vacío.' })
  @Length(1, 1, { message: 'El número de semana debe tener 1 caracter.' })
  readonly nroSemana: string;

  @IsEnum(ESTADOSEMANA, { message: 'El estado de la semana no es válido.' })
  @IsOptional()
  readonly estadoSemana?: ESTADOSEMANA;

  @IsNumber({}, { message: 'El ID de la rutina debe ser un número.' })
  @IsNotEmpty({ message: 'Debes proporcionar el ID de la rutina.' })
  readonly rutinaId: number;
}
