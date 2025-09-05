// export class CreateDiaDto {}
// En la carpeta src/dia/dto/create-dia.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Length,
} from 'class-validator';

export class CreateDiaDto {
  @IsString({ message: 'El número de día debe ser un texto.' })
  @IsNotEmpty({ message: 'El número de día no puede estar vacío.' })
  @Length(1, 1, { message: 'El número de día debe tener 1 caracter.' })
  readonly nroDia: string;

  @IsString({ message: 'El focus debe ser un texto.' })
  @IsNotEmpty({ message: 'El focus no puede estar vacío.' })
  readonly focus: string;

  @IsNumber({}, { message: 'El ID de la semana debe ser un número.' })
  @IsNotEmpty({ message: 'Debes proporcionar el ID de la semana.' })
  readonly semanaId: number;
}