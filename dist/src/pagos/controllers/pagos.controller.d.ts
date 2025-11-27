import { PagosService } from '../services/pagos.service';
import { CreatePagoDto } from '../dto/create-pago.dto';
import { RtaPagoDto } from '../dto/rta-pago.dto';
export declare class PagosController {
    private readonly pagosService;
    constructor(pagosService: PagosService);
    registrarPagoManual(createPagoDto: CreatePagoDto): Promise<{
        message: string;
        pago: boolean;
    }>;
    obtenerTodosLosPagos(): Promise<RtaPagoDto[]>;
    obtenerImpagos(): Promise<import("../dto/rta-impagos-dto").RtaImpagosDto[]>;
    obtenerPagoPorId(id: number): Promise<RtaPagoDto[]>;
}
