import { RutinaService } from '../services/rutina.service';
import { CreateRutinaDto } from '../dto/create-rutina.dto';
import { EstadoDto } from '../dto/estado.dto';
import { RtaRutinaDto } from '../dto/rta-rutina.dto';
import { RtaRutinaEstadisticaDto } from '../dto/rta-rutina-estadistica.dto';
export declare class RutinaController {
    private readonly rutinaService;
    constructor(rutinaService: RutinaService);
    registerRutina(createRutinaDto: CreateRutinaDto): Promise<RtaRutinaDto>;
    findAllRutinas(): Promise<import("../dto/rta-all-rutinas.dto").RtaAllRutinasDto[]>;
    findRutinaById(id: number): Promise<RtaRutinaDto>;
    findRutinaByIdEstadistica(id: number): Promise<RtaRutinaEstadisticaDto>;
    update(id: number, rutinaDto: CreateRutinaDto): Promise<RtaRutinaDto>;
    deleteRutina(id: number): Promise<boolean>;
    updateEstado(id: number, body: EstadoDto): Promise<Boolean>;
}
