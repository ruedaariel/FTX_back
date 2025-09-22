import { IsNotEmpty, IsString, MaxLength, IsNumber, Min, IsDateString } from 'class-validator';

export class CreatePlanDto {
  @IsNotEmpty({message: "El nombre del plan no debe ser vacio"})
  @IsString({message: "El nombre del plan debe ser una cadena de letras"})
  @MaxLength(30,{message: "El nombre del plan debe tener 30 caracteres como máximo"})
  nombrePlan: string;

  @IsNotEmpty({message: "La descripción del plan no debe ser vacio"})
  @IsString()
  descripcion: string;

  @IsNotEmpty({message: "El precio del plan no debe ser vacio"})
  @IsNumber({ maxDecimalPlaces: 2 },{message: "El precio del plan debe ser un numero (0 como mínimo)"})
  @Min(0, {message: "El precio del plan debe ser 0 como mínimo"})
  precio: number;
}

