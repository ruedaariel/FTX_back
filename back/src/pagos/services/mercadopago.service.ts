import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';

@Injectable()
export class MercadoPagoService {
  private mpClient: MercadoPagoConfig;
  private preference: Preference;

  constructor() {
    this.mpClient = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
    });
    this.preference = new Preference(this.mpClient);
  }

  async crearPreferencia(createPagoDto: any) {
    const preference = {
      items: [
        {
          id: 'ftx-plan',
          title: 'Plan FTX',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: Number(createPagoDto.monto),
        },
      ],
      payer: {
        email: `user${createPagoDto.usuarioId}@ftx.com`, // Email ficticio basado en el ID
      },
      payment_methods: {
        excluded_payment_types: [],
        installments: 1,
      },
      back_urls: {
        success: 'http://localhost:3000/pagos/success',
        failure: 'http://localhost:3000/pagos/failure',
        pending: 'http://localhost:3000/pagos/pending',
      },
      auto_return: 'approved',
    };
    return await this.preference.create({ body: preference });
  }
}
