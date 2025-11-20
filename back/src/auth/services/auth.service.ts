import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { LoginRtaDto } from '../dto/login-rta.dto';
import { ESTADO } from '../../constantes/estado.enum';
import * as bcrypt from 'bcrypt';
import { ErrorManager } from '../../config/error.manager';
import { plainToInstance } from 'class-transformer';
import * as jwt from 'jsonwebtoken';
//import type { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
//import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
//import { Repository } from 'typeorm';
//import { IpayloadToken } from 'src/interfaces/auth.interface';
//import { PagoEntity } from 'src/pagos/entity/pago.entity';
import { toLocalDateOnly } from 'src/utils/transformar-fecha';
import { DIAS_PROXIMOS, PLAN_MENOR_LEVEL } from 'src/constantes/ctes-login';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import { PagosService } from 'src/pagos/services/pagos.service';
import { IpayloadToken } from 'src/interfaces/auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly pagoService: PagosService) { }
    //@InjectRepository(UsuarioEntity)
    //private readonly usuarioRepository: Repository<UsuarioEntity>,
    /*   @InjectRepository(PagoEntity)
      private readonly pagoRepository: Repository<PagoEntity>) { } */



    public async loginUsuario(body: LoginDto): Promise<LoginRtaDto> { //retorna null si no encuentra el mail para crear unnuevo ususario


        try {

            //no uso em metodo del service porque tengo que impoertar tooodo del usuario :(
            /*   const unUsuario = await this.usuarioRepository.findOne({
                  where: { email: body.email },
                  relations: ['datosPersonales', 'datosPersonales.plan']
              }
              ); */

            const unUsuario = await this.usuarioService.findUsuarioByMail(body.email);

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

            let message = "";
            if (unUsuario.rol === "usuario") {
                //             console.log("entro a usuario", unUsuario.id);

                const ultimosPagos = await this.pagoService.findPagosxId(unUsuario.id);
                /*    const ultimoPago = await this.pagoRepository.findOne({
                       where: { usuarioId: unUsuario.id },
                       order: { fechaPago: 'DESC' } // o la columna que define "último"
                   }); */


                if (!ultimosPagos || ultimosPagos.length === 0) {
                    message = message + " impago ,"
                } else {
                    const fVencimientoDateOnly = toLocalDateOnly(ultimosPagos[0].fechaVencimiento);
                    const hoyDateOnly = toLocalDateOnly(new Date()); //hoy

                    if (fVencimientoDateOnly.getTime() < hoyDateOnly.getTime()) {
                        message = message + " impago ,"
                    } else {
                        const fProxima = new Date(fVencimientoDateOnly.getTime());
                        fProxima.setDate(fProxima.getDate() - DIAS_PROXIMOS);

                        if (fProxima.getTime() < hoyDateOnly.getTime()) {
                            message = message + " proximo a vencer ,"
                        }
                    }
                }
                if (unUsuario.level === 0) {
                    unUsuario.level = unUsuario.datosPersonales?.plan?.level ? unUsuario.datosPersonales?.plan?.level : PLAN_MENOR_LEVEL; //o el nivel mas basico definido
                    message = message + " primera vez , ";
                }
            }

            const usuarioRtaDto = plainToInstance(LoginRtaDto, {
                ...unUsuario, token, message  // agregás el token al DTO
            }, { excludeExtraneousValues: true })

            return usuarioRtaDto;

        } catch (err) {
            console.error('Error al buscar ultimoPago', err.message, err.stack);
            throw ErrorManager.handle(err)
        }
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


