import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { PUBLIC_KEY } from 'src/constantes/key-decorators';
import { IuseToken } from 'src/interfaces/auth.interface';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import { useToken } from 'src/utils/use-token';

@Injectable()
//determina si puedo acceder a una ruta o no
export class AuthGuard implements CanActivate {
  constructor(
  //  private readonly usuarioService: UsuarioService,
    private readonly reflector: Reflector) { }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY,context.getHandler(),); //comprueba si es publica, si es publica, reflector devuelve true, y no hace mas nada

    if (isPublic) {
      return true;
    }

    //Request es de tipo Express (ojo cuando se selecciona, hay que elegir la "llave")
    //saca el objeto Express Request desde el contexto de Nest.
    const req = context.switchToHttp().getRequest<Request>() 

   //lee la cabecera
    const token = req.headers['ftx_token']

    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Token invalido')
    }

    //useToken esta en utils y devuelve el payload con el isexpired o un string (error)
    const manageToken: IuseToken | string = useToken(token);

    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }

    if (manageToken.isExpired) {
     throw new UnauthorizedException('Token expirado')
    }

    const {sub} = manageToken;
 /*    const user = await this.usuarioService.findUsuarioById(sub);

    if (!user) {
      throw new UnauthorizedException('Usuario invalido');
    }
//Asigna req.idUser = user.id y req.rolUser = user.rol para que controladores  puedan acceder al id y rol del usuario autenticado.
    req.idUser = user.id
    req.rolUser = user.rol */

    const { rol } = manageToken;
    req.idUser = String(sub);
    req.rolUser = String(rol);
    return true;
  }
}
