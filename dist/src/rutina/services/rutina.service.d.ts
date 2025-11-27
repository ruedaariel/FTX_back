import { CreateRutinaDto } from '../dto/create-rutina.dto';
import { RutinaEntity } from '../entities/rutina.entity';
import { UsuarioEntity } from '../../usuario/entities/usuario.entity';
import { EntityManager, Repository } from 'typeorm';
import { EjercicioBasicoEntity } from '../../ejercicio-basico/entities/ejercicio-basico.entity';
import { RtaAllRutinasDto } from '../dto/rta-all-rutinas.dto';
import { FileImgService } from '../../shared/file-img/file-img.service';
import { RtaRutinaDto } from '../dto/rta-rutina.dto';
import { EstadoDto } from '../dto/estado.dto';
export declare class RutinaService {
    private readonly usuarioRepository;
    private readonly rutinaRepository;
    private readonly ejercicioBasicoRepository;
    private readonly entityManager;
    private readonly fileImgService;
    constructor(usuarioRepository: Repository<UsuarioEntity>, rutinaRepository: Repository<RutinaEntity>, ejercicioBasicoRepository: Repository<EjercicioBasicoEntity>, entityManager: EntityManager, fileImgService: FileImgService);
    createRutina(rutinaDto: CreateRutinaDto): Promise<RtaRutinaDto>;
    findAllRutinas(): Promise<RtaAllRutinasDto[]>;
    findRutinaById(id: number): Promise<RutinaEntity>;
    findRutinaByName(nombre: string): Promise<RutinaEntity | null>;
    updateRutina(id: number, rutinaDto: CreateRutinaDto): Promise<RtaRutinaDto>;
    deleteRutina(id: number): Promise<boolean>;
    updateEstado(id: number, body: EstadoDto): Promise<Boolean>;
}
