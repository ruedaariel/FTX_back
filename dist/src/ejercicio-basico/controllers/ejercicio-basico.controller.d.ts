import { EjercicioBasicoService } from '../services/ejercicio-basico.service';
import { CreateEjercicioBasicoDto } from '../dto/create-ejercicio-basico.dto';
import { UpdateEjercicioBasicoDto } from '../dto/update-ejercicio-basico.dto';
export declare class EjercicioBasicoController {
    private readonly ejercicioBasicoService;
    constructor(ejercicioBasicoService: EjercicioBasicoService);
    createEjercicioBasico(file: Express.Multer.File, body: CreateEjercicioBasicoDto): Promise<import("../dto/rta-ejercicio-basico.dto").RtaEjercicioBasicoDto>;
    findAll(): Promise<import("../dto/rta-ejercicio-basico.dto").RtaEjercicioBasicoDto[]>;
    update(id: number, updateEjercicioBasicoDto: UpdateEjercicioBasicoDto, file: Express.Multer.File): Promise<import("../dto/rta-ejercicio-basico.dto").RtaEjercicioBasicoDto>;
    remove(id: number): Promise<boolean>;
}
