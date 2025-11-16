import {  IsEnum } from "class-validator";
import { ESTADORUTINA } from "../entities/rutina.entity";

export class EstadoDto {
    @IsEnum(ESTADORUTINA, { message: "Debe tener algun estado valido" })
    estadoRutina: ESTADORUTINA;
}
