import { ConfigService } from '@nestjs/config';
export declare class FileImgService {
    private readonly configService;
    constructor(configService: ConfigService);
    borrarImagen(nombreArchivo: string, directorio: string): Promise<boolean>;
    construirUrlImagen(nombreArchivo: string, directorio: string): string;
}
