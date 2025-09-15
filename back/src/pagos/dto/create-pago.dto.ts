import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { MetodoDePago } from '../entity/pago.entity';

export class CreatePagoDto {
  @IsOptional()
  @IsString()
  fechaPago?: string; // ISO string, opcional si lo provee MercadoPago

  @IsString()
  estado: string;

  @IsInt()
  diasAdicionales: number;

  @IsEnum(MetodoDePago)
  metodoDePago: MetodoDePago;

  @IsNumber({ maxDecimalPlaces: 2 })
  monto: number;

  @IsInt()
  usuarioId: number; // id del usuario asociado
}
