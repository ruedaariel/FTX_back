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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pago_entity_1 = require("../entity/pago.entity");
const usuario_entity_1 = require("../../usuario/entities/usuario.entity");
const mercadopago_service_1 = require("./mercadopago.service");
const transformar_fecha_1 = require("../../utils/transformar-fecha");
const error_manager_1 = require("../../config/error.manager");
const rta_pago_dto_1 = require("../dto/rta-pago.dto");
const class_transformer_1 = require("class-transformer");
const usuario_service_1 = require("../../usuario/services/usuario.service");
let PagosService = class PagosService {
    mpService;
    pagoRepository;
    usuarioService;
    usuarioRepository;
    constructor(mpService, pagoRepository, usuarioService, usuarioRepository) {
        this.mpService = mpService;
        this.pagoRepository = pagoRepository;
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
    }
    async iniciarPago(iniciarPagoDto) {
        const mpResponse = await this.mpService.crearPreferencia(iniciarPagoDto);
        const createPagoDto = {
            fechaPago: mpResponse.date_created,
            estado: 'pending',
            monto: mpResponse.items?.[0]?.unit_price || iniciarPagoDto.monto,
            preferenciaId: mpResponse.id,
            external_reference: mpResponse.external_reference,
            diasAdicionales: iniciarPagoDto.diasAdicionales,
            metodoDePago: iniciarPagoDto.metodoDePago,
            usuarioId: iniciarPagoDto.usuarioId,
        };
        const pagoGuardado = await this.guardarPago(createPagoDto);
        return {
            estado: createPagoDto.estado,
            init_point: mpResponse.init_point,
            preferenciaId: mpResponse.id,
            pagoId: pagoGuardado.idPagos,
        };
    }
    async guardarPago(createPagoDto) {
        const usuario = await this.usuarioService.findUsuarioById(createPagoDto.usuarioId);
        if (!usuario) {
            throw new Error(`Usuario con ID ${createPagoDto.usuarioId} no encontrado`);
        }
        const fPago = createPagoDto.fechaPago
            ? new Date(createPagoDto.fechaPago)
            : new Date();
        const fVencimiento = (0, transformar_fecha_1.calcularFechaVencimiento)(fPago, true);
        if (createPagoDto.monto === 0) {
            fVencimiento.setDate(fPago.getDate() + 15);
        }
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
        return await this.pagoRepository.save(pago);
    }
    async guardarPagoManual(createPagoDto) {
        if (![pago_entity_1.METODODEPAGO.TRANSFERENCIA, pago_entity_1.METODODEPAGO.EFECTIVO].includes(createPagoDto.metodoDePago)) {
            throw new Error('Método de pago no válido para registro manual');
        }
        if (createPagoDto.estado !== 'approved') {
            throw new Error('Los pagos manuales deben estar aprobados');
        }
        return await this.guardarPago(createPagoDto);
    }
    async obtenerTodosLosPagos() {
        const pagos = await this.pagoRepository.find({ relations: ['usuario', 'usuario.datosPersonales'], order: { fechaPago: 'DESC' } });
        console.log("entro a obtener todos los pagos");
        const pagosDto = (0, class_transformer_1.plainToInstance)(rta_pago_dto_1.RtaPagoDto, pagos, { excludeExtraneousValues: true });
        console.log("paso plaintoinstance en pagos");
        return pagosDto;
    }
    async obtenerImpagos() {
        const fechaFin = new Date();
        fechaFin.setHours(0, 0, 0, 0);
        const fechaInicio = new Date(fechaFin);
        fechaInicio.setFullYear(fechaInicio.getFullYear() - 1);
        const subQ = this.pagoRepository.createQueryBuilder('p_sub')
            .select('p_sub.usuarioId', 'usuarioId')
            .addSelect('MAX(p_sub.fechaVencimiento)', 'lastVencimiento')
            .groupBy('p_sub.usuarioId');
        const usuariosConDeuda = await this.usuarioRepository.createQueryBuilder('u')
            .innerJoin('(' + subQ.getQuery() + ')', 't', 't.usuarioId = u.id')
            .innerJoin('pago', 'p', 'p.usuarioId = t.usuarioId AND p.fechaVencimiento = t.lastVencimiento')
            .leftJoin('u.datosPersonales', 'dp')
            .setParameters(subQ.getParameters())
            .where('t.lastVencimiento >= :fechaInicio AND t.lastVencimiento < :fechaFin', { fechaInicio, fechaFin })
            .andWhere('u.rol = :rol', { rol: 'usuario' })
            .select([
            'u.id AS usuarioId',
            'u.estado AS estadoUsuario',
            'dp.nombre AS nombre',
            'dp.apellido AS apellido',
            'p.idPagos AS idPagos',
            'p.fechaPago AS fechaPago',
            'p.fechaVencimiento AS fechaVencimiento',
            'p.metodoDePago AS metodoDePago',
            'p.monto AS monto'
        ]).getRawMany();
        const nuncaPagaron = await this.usuarioRepository.createQueryBuilder('u')
            .leftJoin('u.pagos', 'p')
            .leftJoin('u.datosPersonales', 'dp')
            .leftJoin('dp.plan', 'pl')
            .where('p.usuarioId IS NULL')
            .andWhere('(pl.precio IS NULL OR pl.precio > 0)')
            .andWhere('u.rol = :rol', { rol: 'usuario' })
            .select([
            'u.id AS usuarioId',
            'u.estado AS estadoUsuario',
            'dp.nombre AS nombre',
            'dp.apellido AS apellido',
            'NULL AS idPagos',
            'NULL AS fechaPago',
            'NULL AS fechaVencimiento',
            'NULL AS metodoDePago',
            'NULL AS monto'
        ])
            .getRawMany();
        console.log(nuncaPagaron);
        const combinado = [...usuariosConDeuda, ...nuncaPagaron];
        combinado.sort((a, b) => {
            const aDate = a.fechaVencimiento ? new Date(a.fechaVencimiento).getTime() : null;
            const bDate = b.fechaVencimiento ? new Date(b.fechaVencimiento).getTime() : null;
            if (aDate === null && bDate === null)
                return 0;
            if (aDate === null)
                return 1;
            if (bDate === null)
                return -1;
            return bDate - aDate;
        });
        const pagosDto = (0, class_transformer_1.plainToInstance)(rta_pago_dto_1.RtaPagoDto, combinado, { excludeExtraneousValues: true });
        return pagosDto;
    }
    async eliminarPago(id) {
        await this.pagoRepository.delete(id);
    }
    async actualizarEstadoPago(datosMercadoPago) {
        const pagoExistente = await this.pagoRepository.findOne({
            where: {
                usuario: {
                    id: parseInt(datosMercadoPago.external_reference?.replace('usuario-', '')),
                },
            },
            relations: ['usuario'],
        });
        if (pagoExistente) {
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
    async findPagosxId(id) {
        try {
            const unUsuario = await this.usuarioService.findUsuarioById(id);
            if (!unUsuario) {
                throw new error_manager_1.ErrorManager("BAD_REQUEST", "Usuario inexistente");
            }
            if (unUsuario.rol !== "usuario") {
                throw new error_manager_1.ErrorManager("BAD_REQUEST", "No es un cliente");
            }
            const pagos = await this.pagoRepository.find({
                where: { usuarioId: unUsuario.id },
                order: { fechaPago: 'DESC' }
            });
            return pagos;
        }
        catch (error) {
            throw error_manager_1.ErrorManager.handle(error);
        }
    }
};
exports.PagosService = PagosService;
exports.PagosService = PagosService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(pago_entity_1.PagoEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(usuario_entity_1.UsuarioEntity)),
    __metadata("design:paramtypes", [mercadopago_service_1.MercadoPagoService,
        typeorm_2.Repository,
        usuario_service_1.UsuarioService,
        typeorm_2.Repository])
], PagosService);
//# sourceMappingURL=pagos.service.js.map