<<<<<<< HEAD
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
=======
import { IsEnum, IsNotEmpty, IsString, Length, Matches, ValidateNested } from "class-validator";
import { ESTADOSEMANA } from "../entities/semana.entity";
import { Type } from "class-transformer";
import { CreateDiaDto } from "src/dia/dto/create-dia.dto";

export class CreateSemanaDto {

    @IsNotEmpty({ message: 'Falta el numero de semana' })
    @IsString()
    @Length(1, 1, { message: 'Debe tener exactamente 1 carácter' })
    @Matches(/^[1-4]$/, { message: 'Debe ser un número entre 1 y 4' })
    nroSemana: string;

    @IsNotEmpty()
    @IsEnum(ESTADOSEMANA, { message: "Debe ser un estado valido (para la semana)" })
    estadoSemana: ESTADOSEMANA;

    @ValidateNested({each: true})
    @Type(()=>CreateDiaDto)
    dias: CreateDiaDto[]
>>>>>>> 0de68b249e0fe88d31d3bb6657d2cad241655105
}
