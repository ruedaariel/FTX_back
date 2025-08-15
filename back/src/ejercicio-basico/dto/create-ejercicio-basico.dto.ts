import { IsOptional, isString, IsString, IsUrl, Length, Matches } from "class-validator";

export class CreateEjercicioBasicoDto {
    @IsString({ message: 'El nombre debe ser un texto' })
    @Matches(/^[\p{L}\p{N} ,()/%°\-\[\]]{2,60}$/u, {
        message: 'Debe tener entre 2 y 60 caracteres y solo caracteres válidos',
    })
    @Length(3, 60, {
        message: 'Debe tener al menos 3 caracteres y max 60',
    })
    nombreEjercicio: string;

    @IsString()
    @IsOptional()
    observaciones:string;
    
    @IsOptional()
    @Matches(/^(\.\/|\/)?[\w\-\/]+\.(jpg|png|webp)$/, {
        message: 'Debe ser una ruta válida con extensión .jpg, .png o .webp',
    })
    imagenLink: string | null;

    @IsOptional()
    @IsUrl({}, { message: 'videoLink debe ser una URL válida' })
    videoLink: string | null;
}
