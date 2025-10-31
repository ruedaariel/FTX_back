import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { LoginRtaDto } from '../dto/login-rta.dto';
import { ESTADO } from '../../constantes/estado.enum';
import * as bcrypt from 'bcrypt';
import { ErrorManager } from '../../config/error.manager';
import { plainToInstance } from 'class-transformer';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { IpayloadToken } from 'src/interfaces/auth.interface';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>) { }

    public async loginUsuario(body: LoginDto): Promise<LoginRtaDto> { //retorna null si no encuentra el mail para crear unnuevo ususario
        try {

            //no uso em metodo del service porque tengo que impoertar tooodo del usuario :(
            const unUsuario = await this.usuarioRepository.findOneBy({ email: body.email });

            if (!unUsuario || unUsuario.estado === ESTADO.ARCHIVADO) {
                throw new ErrorManager('UNAUTHORIZED', 'Email incorrecto');
            }

            const passwordValida = await bcrypt.compare(body.password, unUsuario.password);
            if (!passwordValida) {
                throw new ErrorManager('UNAUTHORIZED', 'password incorrecta');
            }

            /*    const payload = {
                   sub: unUsuario.id,
                   email: unUsuario.email,
                   rol: unUsuario.rol,
               }; */


            /* const secret = process.env.JWT_SECRET;
            if (!secret) throw new Error('JWT_SECRET no definido en variables de entorno'); */

            /* const token = jwt.sign(payload, secret, { expiresIn: '1h' });
 */
            const token = await this.generateJWT(unUsuario)
            const usuarioRtaDto = plainToInstance(LoginRtaDto, {
                ...unUsuario, token
                , // agregás el token al DTO
            })

            return usuarioRtaDto;

        } catch (err) { throw ErrorManager.handle(err) }
    }

    /* public signJWT({
        payload,secret,expires, }: {payload:jwt.JwtPayload; secret: string; expires: number | string}) {
            return jwt.sign(payload, secret, {expiresIn: expires});
        } */

    public async generateJWT(usuario: UsuarioEntity): Promise<string> {

        const payload: IpayloadToken = {
            sub: usuario.id,
            email: usuario.email,
            rol: usuario.rol,
        };
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error('JWT_SECRET no definido en variables de entorno');

        return jwt.sign(payload, secret, { expiresIn: '1h' });

    }


}


