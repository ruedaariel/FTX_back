import { IsEmail, IsEnum, IsNotEmpty, Matches } from "class-validator";
import { ROL } from "../entities/usuario.entity";
import { ESTADO } from "../../constantes/estado.enum";
import { Exclude, Expose } from "class-transformer";

export class LoginRtaDto {
    @Expose()
    id: number;

    @Expose()
    email: string;

    @Expose()
    rol: ROL;

    @Expose()
    estado: ESTADO;

    @Exclude()
    password: string;
    
    @Exclude()
    fBaja: Date;

    @Exclude()
    fCreacion: Date;

    @Exclude()
    fUltimoAcceso: Date;
    //AGREGAR TOKEN 
}
