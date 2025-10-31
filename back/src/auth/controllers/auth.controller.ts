import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {

   constructor(private readonly authService: AuthService) { }

     @Post('login')
  public async login(@Body() body: LoginDto) {
    return await this.authService.loginUsuario(body);
}
}