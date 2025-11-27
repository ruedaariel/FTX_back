import { METODODEPAGO } from "../entity/pago.entity";
import { ESTADO } from "src/constantes/estado.enum";
export declare class RtaPagoDto {
    idPagos: number;
    fechaPago: Date | null;
    fechaVencimiento: Date | null;
    estado: string;
    diasAdicionales: number;
    metodoDePago: METODODEPAGO;
    monto: number;
    usuarioId: number;
    createdAt: Date;
    estadoUsuario?: ESTADO;
    nombre?: string;
    apellido?: string;
}
