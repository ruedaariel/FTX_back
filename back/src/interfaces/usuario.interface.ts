import { ESTADO, ROL } from "src/usuario/entities/usuario.entity";

export interface IUsuario {
    id: number;
    email: string;
    password: string;
    rol: ROL;
    fCreacion: Date;
    fUltimoAcceso: Date;
    fBaja: Date|null,
    estado: ESTADO
}