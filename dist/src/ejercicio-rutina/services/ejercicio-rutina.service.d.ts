import { EjercicioRutinaEntity } from '../entities/ejercicio-rutina.entity';
import { Repository } from 'typeorm';
export declare class EjercicioRutinaService {
    private readonly ejercicioRutinaRepository;
    constructor(ejercicioRutinaRepository: Repository<EjercicioRutinaEntity>);
    updateEjHecho(id: number, ejHecho: boolean): Promise<boolean>;
}
