import { Body, Controller, Post } from '@nestjs/common';
import { IniciarPagoDto } from '../dto/create-pago.dto';
import { PagosService } from '../services/pagos.service';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post('iniciar')
  async iniciarPago(@Body() iniciarPagoDto: IniciarPagoDto) {
    // Recibe los datos del frontend y llama al servicio para procesar el pago
    return await this.pagosService.iniciarPago(iniciarPagoDto);
  }

  @Post('webhook')
  async recibirWebhook(@Body() webhookData: any) {
    // Recibe notificaciones de MercadoPago sobre cambios de estado
    return await this.pagosService.actualizarEstadoPago(webhookData);
  }
}