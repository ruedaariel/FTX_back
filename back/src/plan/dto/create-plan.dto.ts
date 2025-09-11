import { IsNotEmpty, IsString, MaxLength, IsNumber, Min, IsDateString } from 'class-validator';

export class CreatePlanDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  nombrePlan: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio: number;

  @IsNotEmpty()
  @IsDateString() //verifica que tenga formato de fecha
  fCambio: string; 
}

