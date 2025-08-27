import { IsEnum, IsInt, IsNotEmpty, IsOptional, Matches, ValidateNested } from "class-validator";
import { ESTADORUTINA } from "../entities/rutina.entity";
import { Type } from "class-transformer";
import { CreateSemanaDto } from "src/semana/dto/create-semana.dto";

export class CreateRutinaDto {
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @Matches(/^.{3,}$/, { message: 'El nombre debe tener al menos 2 caracteres' })
    nombreRutina: string;

    @IsEnum(ESTADORUTINA, { message: "Debe tener algun estado valido" })
    estadoRutina: ESTADORUTINA;

    @IsOptional()
    @IsInt({ message: 'El idUsuario debe ser un número entero' })
    idUsuario:number | null;

    @ValidateNested({each : true})
    @Type(()=> CreateSemanaDto)
    semanas: CreateSemanaDto[];
}
