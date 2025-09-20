import { Body, Controller, Post } from '@nestjs/common';
import { PagosService } from '../services/pagos.service';
import { CreatePagoDto, IniciarPagoDto } from '../dto/create-pago.dto';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post('iniciar')
  async iniciarPago(@Body() iniciarPagoDto: IniciarPagoDto) {
    // Recibe los datos del frontend y llama al servicio para procesar el pago
    return await this.pagosService.iniciarPago(iniciarPagoDto);
  }

  @Post('manual')
  async registrarPagoManual(@Body() createPagoDto: CreatePagoDto) {
    // Registra un pago manual (transferencia/efectivo) directamente
    const pagoGuardado = await this.pagosService.guardarPagoManual(createPagoDto);
    return {
      message: 'Pago manual registrado exitosamente',
      pago: pagoGuardado
    };
  }

  @Post('webhook')
  async recibirWebhook(@Body() webhookData: any) {
    // Recibe notificaciones de MercadoPago sobre cambios de estado
    return await this.pagosService.actualizarEstadoPago(webhookData);
  }
}
