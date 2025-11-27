import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';
import { ResetDto } from '../dto/reset.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDto): Promise<import("../dto/login-rta.dto").LoginRtaDto>;
    reset(body: ResetDto): Promise<boolean>;
}
