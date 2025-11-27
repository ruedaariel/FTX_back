import { METODODEPAGO } from '../entity/pago.entity';
export declare class PayerDto {
    name: string;
    surname: string;
    email: string;
    phone?: string;
    identification_type?: string;
    identification_number?: string;
}
export declare class BackUrlsDto {
    success?: string;
    failure?: string;
    pending?: string;
}
export declare class IniciarPagoDto {
    usuarioId: number;
    monto: number;
    diasAdicionales: number;
    metodoDePago: METODODEPAGO;
    descripcion: string;
    payer: PayerDto;
    back_urls?: BackUrlsDto;
    external_reference?: string;
    notification_url?: string;
    expires?: number;
    currency_id?: string;
    installments?: number;
}
export declare class CreatePagoDto {
    fechaPago?: string;
    estado: string;
    diasAdicionales?: number;
    metodoDePago: METODODEPAGO;
    monto: number;
    usuarioId: number;
    preferenciaId?: string;
    pagoId?: string;
    external_reference?: string;
}
