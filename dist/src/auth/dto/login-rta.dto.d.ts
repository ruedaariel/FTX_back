import { ESTADO } from "../../constantes/estado.enum";
import { ROL } from "../../constantes/rol";
export declare class LoginRtaDto {
    id: number;
    email: string;
    rol: ROL;
    estado: ESTADO;
    password: string;
    level: number;
    passwordChangedAt: Date | null;
    fBaja: Date;
    fCreacion: Date;
    fUltimoAcceso: Date;
    token: string;
    message: string;
}
