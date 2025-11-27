import { UsuarioService } from '../services/usuario.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { UpdateUsuarioAdmDto } from '../dto/update-Usuario-adm.dto';
import { UsuarioRtaDto } from '../dto/usuario-rta.dto';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    registerUsuario(body: CreateUsuarioDto): Promise<UsuarioRtaDto>;
    findAllUsuarios(): Promise<import("../dto/usuario-datos-completos-rta.dto").UsuarioDatosCompletosRtaDto[]>;
    findUsuarioById(id: number): Promise<UsuarioRtaDto>;
    findRutinasxId(id: number): Promise<import("../dto/rutinasUsuarioRtaDto").RutinasUsuarioRtaDto[] | null>;
    findRutinasxIdEstadistica(id: number): Promise<import("../dto/rutinasUsuarioRtaDto").RutinasUsuarioRtaDto[] | null>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Boolean>;
    updateImagenPerfil(id: number, file: Express.Multer.File): Promise<boolean>;
    updateBasico(id: number, updateUsuarioAdmDto: UpdateUsuarioAdmDto): Promise<import("../dto/update-Usuario-adm-rta.dto").UpdateUsuarioAdmRtaDto>;
    deleteUsuario(id: string): Promise<boolean>;
}
