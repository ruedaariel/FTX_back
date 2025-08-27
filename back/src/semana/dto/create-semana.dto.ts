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
}
