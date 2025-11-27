"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoPagoService = void 0;
const common_1 = require("@nestjs/common");
const mercadopago_1 = require("mercadopago");
let MercadoPagoService = class MercadoPagoService {
    client;
    preference;
    constructor() {
        this.client = new mercadopago_1.MercadoPagoConfig({
            accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
        });
        this.preference = new mercadopago_1.Preference(this.client);
    }
    async crearPreferencia(iniciarPagoDto) {
        const preference = {
            items: [
                {
                    id: `plan-${iniciarPagoDto.diasAdicionales}-dias`,
                    title: iniciarPagoDto.descripcion,
                    quantity: 1,
                    currency_id: iniciarPagoDto.currency_id || 'ARS',
                    unit_price: Number(iniciarPagoDto.monto),
                },
            ],
            payer: {
                name: iniciarPagoDto.payer.name,
                surname: iniciarPagoDto.payer.surname,
                email: iniciarPagoDto.payer.email,
                phone: iniciarPagoDto.payer.phone
                    ? {
                        number: iniciarPagoDto.payer.phone,
                    }
                    : undefined,
                identification: iniciarPagoDto.payer.identification_type &&
                    iniciarPagoDto.payer.identification_number
                    ? {
                        type: iniciarPagoDto.payer.identification_type,
                        number: iniciarPagoDto.payer.identification_number,
                    }
                    : undefined,
            },
            back_urls: iniciarPagoDto.back_urls
                ? {
                    success: iniciarPagoDto.back_urls.success,
                    failure: iniciarPagoDto.back_urls.failure,
                    pending: iniciarPagoDto.back_urls.pending,
                }
                : undefined,
            auto_return: 'approved',
            payment_methods: {
                excluded_payment_types: [],
                installments: iniciarPagoDto.installments || 1,
            },
            notification_url: iniciarPagoDto.notification_url,
            external_reference: iniciarPagoDto.external_reference || `usuario-${iniciarPagoDto.usuarioId}`,
            expires: iniciarPagoDto.expires ? true : false,
            expiration_date_from: iniciarPagoDto.expires
                ? new Date().toISOString()
                : undefined,
            expiration_date_to: iniciarPagoDto.expires && iniciarPagoDto.expires > 0
                ? new Date(Date.now() + iniciarPagoDto.expires * 60 * 1000).toISOString()
                : undefined,
        };
        return await this.preference.create({ body: preference });
    }
    async obtenerPago(pagoId) {
        return null;
    }
};
exports.MercadoPagoService = MercadoPagoService;
exports.MercadoPagoService = MercadoPagoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MercadoPagoService);
//# sourceMappingURL=mercadopago.service.js.map