import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { PublicAccess } from '../decorators/public.decorator';

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @PublicAccess()
  @Post('login')
  public async login(@Body() body: LoginDto) {
    return await this.authService.loginUsuario(body);
  }
}