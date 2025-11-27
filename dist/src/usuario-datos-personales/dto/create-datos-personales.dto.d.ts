import { GENERO } from "../entities/datos-personales.entity";
export declare class CreateDatosPersonalesDto {
    nombre: string;
    apellido: string;
    dni: string;
    phone: string;
    genero: GENERO;
    idPlan: number;
    fNacimiento: string;
    imagenPerfil?: string;
}
