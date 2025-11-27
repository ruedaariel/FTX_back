import { IniciarPagoDto } from '../dto/create-pago.dto';
export declare class MercadoPagoService {
    private client;
    private preference;
    constructor();
    crearPreferencia(iniciarPagoDto: IniciarPagoDto): Promise<import("mercadopago/dist/clients/preference/commonTypes").PreferenceResponse>;
    obtenerPago(pagoId: string): Promise<null>;
}
