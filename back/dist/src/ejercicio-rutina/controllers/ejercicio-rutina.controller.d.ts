import { EjercicioRutinaService } from '../services/ejercicio-rutina.service';
export declare class EjercicioRutinaController {
    private readonly ejercicioRutinaService;
    constructor(ejercicioRutinaService: EjercicioRutinaService);
    update(id: number, body: {
        ejercicioHecho: boolean;
    }): Promise<boolean>;
}
