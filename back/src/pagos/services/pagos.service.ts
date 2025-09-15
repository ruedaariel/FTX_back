import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePagoDto } from '../dto/create-pago.dto';
import { PagoEntity } from '../entity/pago.entity';
import { MercadoPagoService } from './mercadopago.service';

@Injectable()
export class PagosService {
  constructor(
    private readonly mpService: MercadoPagoService,
    @InjectRepository(PagoEntity)
    private readonly pagoRepository: Repository<PagoEntity>,
  ) {}

  async iniciarPago(createPagoDto: CreatePagoDto) {
    // 1. Crear preferencia en MercadoPago
    const mpResponse = await this.mpService.crearPreferencia(createPagoDto);

    // 2. En las preferencias, el estado inicial siempre es 'pending'
    const estado = 'pending';

    // 3. Guardar en la base de datos solo si es 'pending' o 'approved'
    if (estado === 'pending' || estado === 'approved') {
      // Buscar el usuario para la relación
      const usuario = await this.pagoRepository.manager.findOne('UsuarioEntity', {
        where: { id: createPagoDto.usuarioId }
      });

      if (!usuario) {
        throw new Error(`Usuario con ID ${createPagoDto.usuarioId} no encontrado`);
      }

      const pago = this.pagoRepository.create({
        fechaPago: createPagoDto.fechaPago ? new Date(createPagoDto.fechaPago) : new Date(),
        estado: estado,
        diasAdicionales: createPagoDto.diasAdicionales,
        metodoDePago: createPagoDto.metodoDePago,
        monto: createPagoDto.monto,
        usuario: usuario,
      });
      
      await this.pagoRepository.save(pago);
    }

    // 4. Retornar la respuesta relevante al frontend
    return {
      estado,
      init_point: mpResponse.init_point,
      preferenciaId: mpResponse.id,
    };
  }
}