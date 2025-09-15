
import { Exclude, Expose } from "class-transformer";
import { ROL } from "../entities/usuario.entity";
import { ESTADO } from "src/constantes/estado.enum";

export class UsuarioBasicoRtaDto {
    @Expose()
    id: number;
    @Expose()
    email: string;
    @Expose()
    rol: ROL; //ver si se deja
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


}
