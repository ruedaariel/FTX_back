import { CreateEjercicioBasicoDto } from '../dto/create-ejercicio-basico.dto';
import { UpdateEjercicioBasicoDto } from '../dto/update-ejercicio-basico.dto';
import { EjercicioBasicoEntity } from '../entities/ejercicio-basico.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { FileImgService } from '../../shared/file-img/file-img.service';
import { RtaNombreEjercicioBasicoDto } from '../dto/rta-nombre-ejercicio-basico.dto';
import { RtaEjercicioBasicoDto } from '../dto/rta-ejercicio-basico.dto';
export declare class EjercicioBasicoService {
    private readonly ejercicioBasicoRepository;
    private readonly configService;
    private readonly fileImgService;
    constructor(ejercicioBasicoRepository: Repository<EjercicioBasicoEntity>, configService: ConfigService, fileImgService: FileImgService);
    createEjercicioBasico(ejercicioBasicoDto: CreateEjercicioBasicoDto): Promise<RtaEjercicioBasicoDto>;
    findByName(nombreEj: string): Promise<RtaEjercicioBasicoDto>;
    existName(nombreEj: string): Promise<boolean>;
    remove(id: number): Promise<boolean>;
    findOne(id: number): Promise<RtaEjercicioBasicoDto>;
    findAll(): Promise<RtaEjercicioBasicoDto[]>;
    findAllNames(): Promise<RtaNombreEjercicioBasicoDto[]>;
    update(id: number, updateEjercicioBasicoDto: UpdateEjercicioBasicoDto): Promise<RtaEjercicioBasicoDto>;
}
