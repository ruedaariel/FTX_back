import { UsuarioEntity } from '../../usuario/entities/usuario.entity';
export declare enum METODODEPAGO {
    TARJETA = "tarjeta",
    MERCADOPAGO = "mercadopago",
    TRANSFERENCIA = "transferencia",
    EFECTIVO = "efectivo"
}
export declare class PagoEntity {
    idPagos: number;
    fechaPago: Date;
    fechaVencimiento: Date;
    estado: string;
    diasAdicionales: number;
    metodoDePago: METODODEPAGO;
    monto: number;
    referencia: string;
    usuarioId: number;
    usuario: UsuarioEntity;
    createdAt: Date;
}
