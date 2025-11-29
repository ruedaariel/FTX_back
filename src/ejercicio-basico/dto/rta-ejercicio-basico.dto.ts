import { Expose, Transform } from "class-transformer";

export class RtaEjercicioBasicoDto {

    @Expose()
    idEjercicioBasico: number;

    @Expose()
    nombreEjercicio: string;

    @Expose()
    observaciones: string;

    @Expose()
    @Transform(({ value }) => {
        
        
        const baseUrl = `${process.env.BACKEND_URL}/uploads/ejercicios/`;
        console.log("url de imagen", baseUrl);
       
        if (!value) return "";
        if (value.startsWith(baseUrl)) return value;
        return baseUrl + value;
    })
    imagenLink: string;

    @Expose()
    videoLink: string;
}