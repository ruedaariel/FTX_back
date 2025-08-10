import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';


@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('register')
  public async registerUsuario(@Body() body: CreateUsuarioDto) {
    return await this.usuarioService.createUsuario(body);
  }
  @Get('all')
  public async findAllUsuarios() {
    return await this.usuarioService.findAllUsuarios();
  }

  @Get(':id')
  public async findUsuarioById(@Param('id') id: string) {
    return await this.usuarioService.findUsuarioById(+id);
  }

  @Patch('update/:id')
  public async update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {

   // return await this.usuarioService.updateUsuario(+id, updateUsuarioDto);
   return 'hacer update'
  }

  @Delete('delete/:id')
  public async deleteUsuario(@Param('id') id: string) {
    return await this.usuarioService.deleteUsuario(+id);
  }
}
