import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { LoginRtaDto } from '../dto/login-rta.dto';
import { ESTADO } from '../../constantes/estado.enum';
import * as bcrypt from 'bcrypt';
import { ErrorManager } from '../../config/error.manager';
import { plainToInstance } from 'class-transformer';
import * as jwt from 'jsonwebtoken';
//import type { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { IpayloadToken } from 'src/interfaces/auth.interface';
import { PagoEntity } from 'src/pagos/entity/pago.entity';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly pagoRepository: Repository<PagoEntity>) { }

    public async loginUsuario(body: LoginDto): Promise<LoginRtaDto> { //retorna null si no encuentra el mail para crear unnuevo ususario
        try {

            //no uso em metodo del service porque tengo que impoertar tooodo del usuario :(
            const unUsuario = await this.usuarioRepository.findOne({
                where: { email: body.email },
                relations: ['datosPersonales', 'datosPersonales.plan']
            }
            );

            console.log("unusuario ---->", unUsuario);

            if (!unUsuario) {
                throw new ErrorManager('UNAUTHORIZED', 'Email incorrecto');
            }

            if (unUsuario.estado === ESTADO.ARCHIVADO) {
                throw new ErrorManager('UNAUTHORIZED', 'Tu cuenta está inactiva.\nContactá al administrador para reactivarla.');
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
            const token = await this.generateJWT(unUsuario);
            // REVISAR LOS PAGOS y ver si pago o no y agregar a message

            let message = "";
            const ultimoPago = await this.pagoRepository.findOne({
                where: { usuario: {id: unUsuario.id}  },
                order: { fechaPago: 'DESC' } // o la columna que define "último"
            });
           /*  if (!ultimoPago) {
                message = message + "impago ,"
            } else {
                if 
            } */
            if (unUsuario.level === 0) {
                unUsuario.level = unUsuario.datosPersonales?.plan?.level ? unUsuario.datosPersonales?.plan?.level : 10; //o el nivel mas basico definido
                message = message + " primera vez , ";
            }
            const usuarioRtaDto = plainToInstance(LoginRtaDto, {
                ...unUsuario, token, message  // agregás el token al DTO
            }, { excludeExtraneousValues: true })

            return usuarioRtaDto;

        } catch (err) { throw ErrorManager.handle(err) }
    }


    public async generateJWT(usuario: UsuarioEntity): Promise<string> {

        const payload: IpayloadToken = {
            sub: usuario.id,
            email: usuario.email,
            rol: usuario.rol,
        };
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error('JWT_SECRET no definido en variables de entorno');

        return jwt.sign(payload, secret, { expiresIn: '2h' });

    }


}


