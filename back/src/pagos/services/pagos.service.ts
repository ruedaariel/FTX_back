import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePagoDto, IniciarPagoDto } from '../dto/create-pago.dto';
import { PagoEntity, METODODEPAGO } from '../entity/pago.entity';
import { UsuarioEntity } from '../../usuario/entities/usuario.entity';
import { MercadoPagoService } from './mercadopago.service';
import { calcularFechaVencimiento } from '../../utils/transformar-fecha';
import { ErrorManager } from 'src/config/error.manager';
import { RtaPagoDto } from '../dto/rta-pago.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PagosService {
  constructor(
    private readonly mpService: MercadoPagoService,
    @InjectRepository(PagoEntity)
    private readonly pagoRepository: Repository<PagoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) { }

  async iniciarPago(iniciarPagoDto: IniciarPagoDto) {
    // 1. Crear preferencia en MercadoPago con datos del frontend
    const mpResponse = await this.mpService.crearPreferencia(iniciarPagoDto);

    // 2. Mapear respuesta de MercadoPago al DTO para BD
    const createPagoDto: CreatePagoDto = {
      fechaPago: mpResponse.date_created,
      estado: 'pending', // Estado inicial de una preferencia
      monto: mpResponse.items?.[0]?.unit_price || iniciarPagoDto.monto,
      preferenciaId: mpResponse.id,
      external_reference: mpResponse.external_reference,

      // Datos que vienen del frontend original
      diasAdicionales: iniciarPagoDto.diasAdicionales,
      metodoDePago: iniciarPagoDto.metodoDePago,
      usuarioId: iniciarPagoDto.usuarioId,
    };

    // 3. Guardar en la base de datos usando el DTO con datos de MercadoPago
    const pagoGuardado = await this.guardarPago(createPagoDto);

    // 4. Retornar respuesta al frontend
    return {
      estado: createPagoDto.estado,
      init_point: mpResponse.init_point,
      preferenciaId: mpResponse.id,
      pagoId: pagoGuardado.idPagos,
    };
  }

  private async guardarPago(createPagoDto: CreatePagoDto): Promise<PagoEntity> {
    // Buscar el usuario para la relación
    const usuario = await this.usuarioRepository.findOne({
      where: { id: createPagoDto.usuarioId },
    });

    if (!usuario) {
      throw new Error(
        `Usuario con ID ${createPagoDto.usuarioId} no encontrado`,
      );
    }
    const fPago = createPagoDto.fechaPago
      ? new Date(createPagoDto.fechaPago)
      : new Date()
    const fVencimiento = calcularFechaVencimiento(fPago, true); /*fechaPagoEsDateOnly=*/
    const pago = this.pagoRepository.create({
      fechaPago: fPago,
      fechaVencimiento: fVencimiento,
      estado: createPagoDto.estado,
      diasAdicionales: createPagoDto.diasAdicionales,
      metodoDePago: createPagoDto.metodoDePago,
      monto: createPagoDto.monto,
      referencia: createPagoDto.external_reference,
      usuario: usuario,
    });
    console.log("pago", pago);
    return await this.pagoRepository.save(pago);
  }

  async guardarPagoManual(createPagoDto: CreatePagoDto): Promise<PagoEntity> {
    // Validar que sea un pago manual válido
    if (
      ![METODODEPAGO.TRANSFERENCIA, METODODEPAGO.EFECTIVO].includes(
        createPagoDto.metodoDePago,
      )
    ) {
      throw new Error('Método de pago no válido para registro manual');
    }

    if (createPagoDto.estado !== 'approved') {
      throw new Error('Los pagos manuales deben estar aprobados');
    }

    return await this.guardarPago(createPagoDto);
  }

  //obtener todos los pagos
  async obtenerTodosLosPagos(): Promise<RtaPagoDto[]> {
    const pagos = await this.pagoRepository.find({ relations: ['usuario'] ,order: { fechaPago: 'DESC' }});
    const pagosDto = plainToInstance(RtaPagoDto, pagos);
    
    return pagosDto;
  }

  //obtener un pago por su ID
 /*  async obtenerPagoPorId(id: number): Promise<PagoEntity> {
    const pago = await this.pagoRepository.findOne({
      where: { idPagos: id },
      relations: ['usuario'],
    });
    if (!pago) {
      throw new Error(`Pago con ID ${id} no encontrado`);
    }
    return pago;
  } */

  //eliminar un pago por su ID
  async eliminarPago(id: number): Promise<void> {
    await this.pagoRepository.delete(id);
  }

  // Método para webhook: actualizar con datos frescos de MercadoPago
  async actualizarEstadoPago(datosMercadoPago: any) {
    // Buscar el pago existente por external_reference o preferenciaId
    const pagoExistente = await this.pagoRepository.findOne({
      where: {
        usuario: {
          id: parseInt(
            datosMercadoPago.external_reference?.replace('usuario-', ''),
          ),
        },
      },
      relations: ['usuario'],
    });

    if (pagoExistente) {
      // Actualizar solo los campos que vienen de MercadoPago
      pagoExistente.estado = datosMercadoPago.status;
      pagoExistente.fechaPago = datosMercadoPago.date_approved
        ? new Date(datosMercadoPago.date_approved)
        : pagoExistente.fechaPago;
      pagoExistente.monto =
        datosMercadoPago.transaction_amount || pagoExistente.monto;

      return await this.pagoRepository.save(pagoExistente);
    }

    throw new Error(`Pago no encontrado para los datos de MercadoPago`);
  }

  public async findPagosxId(id: number): Promise<RtaPagoDto[]> {
    try {

      const unUsuario = await this.usuarioRepository.findOneBy({ id });
      if (!unUsuario) {
        throw new ErrorManager("BAD_REQUEST", "Usuario inexistente");
      }

      if (unUsuario.rol !== "usuario") {
        throw new ErrorManager("BAD_REQUEST", "No es un cliente");
      }

      const pagos = await this.pagoRepository.find({
        where: { usuarioId: unUsuario.id },
        order: { fechaPago: 'DESC' } // o la columna que define "último"
      });

      const pagosDto = plainToInstance(RtaPagoDto, pagos);
      return pagosDto
    } catch (error) {
      throw ErrorManager.handle(error)
    }


  }


}
