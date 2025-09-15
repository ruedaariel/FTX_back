import { IsEmail, IsEnum, IsNotEmpty, Matches } from "class-validator";
import { ROL } from "../entities/usuario.entity";
import { ESTADO } from "src/constantes/estado.enum";

export class LoginRtaDto {
    id: number; 

    email: string;

    rol:ROL;

    estado: ESTADO;

    //AGREGAR TOKEN 
}
