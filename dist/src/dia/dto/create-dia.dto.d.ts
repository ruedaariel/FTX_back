import { CreateEjercicioRutinaDto } from '../../ejercicio-rutina/dto/create-ejercicio-rutina.dto';
export declare class CreateDiaDto {
    nroDia: string;
    focus: string;
    ejerciciosRutina?: CreateEjercicioRutinaDto[];
}
