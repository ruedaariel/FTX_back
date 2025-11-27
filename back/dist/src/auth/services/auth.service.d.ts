import { LoginDto } from '../dto/login.dto';
import { LoginRtaDto } from '../dto/login-rta.dto';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import { PagosService } from 'src/pagos/services/pagos.service';
import { ResetDto } from '../dto/reset.dto';
import { EmailService } from 'src/shared/email/email.service';
export declare class AuthService {
    private readonly usuarioService;
    private readonly pagoService;
    private readonly emailService;
    constructor(usuarioService: UsuarioService, pagoService: PagosService, emailService: EmailService);
    loginUsuario(body: LoginDto): Promise<LoginRtaDto>;
    resetPassw(body: ResetDto): Promise<boolean>;
    private generateJWT;
}
