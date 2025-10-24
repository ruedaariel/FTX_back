import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { LoginDto } from '../dto/login.dto';
import { imagenPerfilInterceptor } from 'src/interceptors/imagen-perfil.interceptor';
import { ErrorManager } from 'src/config/error.manager';
import { UpdateUsuarioAdmDto } from '../dto/update-Usuario-adm.dto';


@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService
  ) { }

  @Post('register')
  public async registerUsuario(@Body() body: CreateUsuarioDto) {
    return await this.usuarioService.createUsuario(body);
  }
  @Get('all')
  public async findAllUsuarios() {
    return await this.usuarioService.findAllUsuarios();
  }

  @Get(':id') //si en @Param no uso 'id', la variable id:number lo toma como objeto y se debe desestructurar en el curpo del controller
  public async findUsuarioById(@Param('id', ParseIntPipe) id: number) { //controla si llega un entero y lanza el error
    return await this.usuarioService.findUsuarioById(id);
  }

  @Get('rutinas/:id')
  public async findRutinasxId(@Param('id', ParseIntPipe) id:number) {
    return await this.usuarioService.findRutinasxId(id);
  }

  @Get('email/:mail')
  public async findUsuarioByMail(@Param('mail') mail: string) {
    return await this.usuarioService.findUsuarioByMail(mail);
  }


  @Patch('update/:id')
   public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,) {
    return await this.usuarioService.updateUsuario(id, updateUsuarioDto);
  }

  // usuario.controller.ts
@Patch(':id/imagen-perfil') // Nuevo endpoint solo para la imagen
@UseInterceptors(imagenPerfilInterceptor())
public async updateImagenPerfil(
  @Param('id', ParseIntPipe) id: number,
  @UploadedFile() file: Express.Multer.File,
) {
  if (!file) {
    throw new ErrorManager('BAD_REQUEST', 'No se ha subido ningún archivo.');
  }
  
  // Llama a un nuevo método en tu servicio para actualizar solo la imagen de perfil
  const imagenActualizada = await this.usuarioService.updateImagenPerfil(id, file.filename);
  
  return imagenActualizada;
}

  @Patch('update-basico/:id')
   public async updateBasico(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioAdmDto: UpdateUsuarioAdmDto,) {
    return await this.usuarioService.updateUsuarioBasico(id, updateUsuarioAdmDto);
  }

  @Delete('delete/:id')
  public async deleteUsuario(@Param('id') id: string) {
    return await this.usuarioService.deleteUsuario(+id);
  }

  @Post('login')
  public async login(@Body() body: LoginDto) {
    return await this.usuarioService.loginUsuario(body);
  }

}
