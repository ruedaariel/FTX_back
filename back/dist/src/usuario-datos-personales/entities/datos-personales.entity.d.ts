import { ESTADO } from "../../constantes/estado.enum";
import { IDatosPersonales } from "src/interfaces/datos-personales.interface";
import { PlanEntity } from "../../plan/entities/plan.entity";
export declare enum GENERO {
    HOMBRE = "hombre",
    MUJER = "mujer",
    OTRO = "otro"
}
export declare class DatosPersonalesEntity implements IDatosPersonales {
    id: number;
    nombre: string;
    apellido: string;
    dni: string;
    phone: string;
    genero: GENERO;
    fNacimiento: Date | null;
    imagenPerfil: string;
    estado: ESTADO;
    plan?: PlanEntity | null;
    constructor();
}
