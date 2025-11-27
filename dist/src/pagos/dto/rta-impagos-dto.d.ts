import { METODODEPAGO } from "../entity/pago.entity";
import { ESTADO } from "src/constantes/estado.enum";
export declare class RtaImpagosDto {
    idPagos: number;
    fechaPago: Date | null;
    fechaVencimiento: Date | null;
    metodoDePago: METODODEPAGO | null;
    monto: number | null;
    usuarioId: number;
    estadoUsuario?: ESTADO;
    nombre?: string;
    apellido?: string;
}
