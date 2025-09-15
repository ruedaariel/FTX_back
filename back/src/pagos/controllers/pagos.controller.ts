import { Body, Controller, Post } from '@nestjs/common';
import { CreatePagoDto } from '../dto/create-pago.dto';
import { PagosService } from '../services/pagos.service';


@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post('iniciar')
  async iniciarPago(@Body() createPagoDto: CreatePagoDto) {
    // Recibe los datos del frontend y llama al servicio para procesar el pago
    return await this.pagosService.iniciarPago(createPagoDto);
  }
}