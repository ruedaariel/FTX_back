import { Repository } from 'typeorm';
import { CreatePagoDto, IniciarPagoDto } from '../dto/create-pago.dto';
import { PagoEntity } from '../entity/pago.entity';
import { UsuarioEntity } from '../../usuario/entities/usuario.entity';
import { MercadoPagoService } from './mercadopago.service';
import { RtaPagoDto } from '../dto/rta-pago.dto';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import { RtaImpagosDto } from '../dto/rta-impagos-dto';
export declare class PagosService {
    private readonly mpService;
    private readonly pagoRepository;
    private readonly usuarioService;
    private readonly usuarioRepository;
    constructor(mpService: MercadoPagoService, pagoRepository: Repository<PagoEntity>, usuarioService: UsuarioService, usuarioRepository: Repository<UsuarioEntity>);
    iniciarPago(iniciarPagoDto: IniciarPagoDto): Promise<{
        estado: string;
        init_point: string | undefined;
        preferenciaId: string | undefined;
        pagoId: number;
    }>;
    guardarPago(createPagoDto: CreatePagoDto): Promise<PagoEntity>;
    guardarPagoManual(createPagoDto: CreatePagoDto): Promise<PagoEntity>;
    obtenerTodosLosPagos(): Promise<RtaPagoDto[]>;
    obtenerImpagos(): Promise<RtaImpagosDto[]>;
    eliminarPago(id: number): Promise<void>;
    actualizarEstadoPago(datosMercadoPago: any): Promise<PagoEntity>;
    findPagosxId(id: number): Promise<PagoEntity[]>;
}
