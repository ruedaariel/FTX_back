import { Body, Controller, Post, Get, Delete, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PagosService } from '../services/pagos.service';
import { CreatePagoDto, IniciarPagoDto } from '../dto/create-pago.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('pagos')
@UseGuards(AuthGuard)
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post('iniciar')
  async iniciarPago(@Body() iniciarPagoDto: IniciarPagoDto) {
    // Recibe los datos del frontend y llama al servicio para procesar el pago
    return await this.pagosService.iniciarPago(iniciarPagoDto);
  }

  @Post('/manual')
  async registrarPagoManual(@Body() createPagoDto: CreatePagoDto) {
    // Registra un pago manual (transferencia/efectivo) directamente
    const pagoGuardado =
      await this.pagosService.guardarPagoManual(createPagoDto);
    return {
      message: 'Pago manual registrado exitosamente',
      pago: pagoGuardado,
    };
  }

  //obtener todos los pagos
  @Get()
  async obtenerTodosLosPagos() {
    return await this.pagosService.obtenerTodosLosPagos();
  }

  //obtener pagos por id
  @Get(':id')
  async obtenerPagoPorId(@Param('id', ParseIntPipe) id: number) {
    return await this.pagosService.findPagosxId(id);
  }

  //eliminar pago por id
  @Delete(':id')
  async eliminarPago(@Param('id') id: number) {
    await this.pagosService.eliminarPago(+id);
    return { message: 'Pago eliminado exitosamente' };
  }

  @Post('webhook')
  async recibirWebhook(@Body() webhookData: any) {
    // Recibe notificaciones de MercadoPago sobre cambios de estado
    return await this.pagosService.actualizarEstadoPago(webhookData);
  }
}
