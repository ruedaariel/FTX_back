
import { ESTADO } from "../../constantes/estado.enum";
import { Exclude, Expose } from "class-transformer";
import { ROL } from "../../constantes/rol";

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
    
    token: string;
}
