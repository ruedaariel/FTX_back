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
import { toLocalDateOnly } from 'src/utils/transformar-fecha';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
        @InjectRepository(PagoEntity)
        private readonly pagoRepository: Repository<PagoEntity>) { }

  

    public async loginUsuario(body: LoginDto): Promise<LoginRtaDto> { //retorna null si no encuentra el mail para crear unnuevo ususario
         const diasProximos = 3;
       
        try {

            //no uso em metodo del service porque tengo que impoertar tooodo del usuario :(
            const unUsuario = await this.usuarioRepository.findOne({
                where: { email: body.email },
                relations: ['datosPersonales', 'datosPersonales.plan']
            }
            );


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
            if (unUsuario.rol === "usuario") {
                console.log("entro a usuario", unUsuario.id);

                const ultimoPago = await this.pagoRepository.findOne({
                    where: { usuarioId: unUsuario.id },
                    order: { fechaPago: 'DESC' } // o la columna que define "último"
                });

                /* 
                const ultimoPago = await this.pagoRepository
                  .createQueryBuilder('p')
                  .where('p.usuarioId = :id', { id: unUsuario.id })
                  .orderBy('p.fechaPago', 'DESC')
                  .limit(1)
                  .getOne();
                 */



                
                if (!ultimoPago) {
                    message = message + "impago ,"
                } else {
                    const fVencimientoDateOnly = toLocalDateOnly(ultimoPago.fechaVencimiento);  
                    const hoyDateOnly = toLocalDateOnly(new Date()); //hoy

                    if (fVencimientoDateOnly.getTime() < hoyDateOnly.getTime()) {
                        message = message + "impago ,"
                    } else {
                        const fProxima = new Date(fVencimientoDateOnly.getTime());
                        fProxima.setDate(fProxima.getDate() - diasProximos);

                        if (fProxima.getTime() < hoyDateOnly.getTime()) {
                            message = message + "proximo a vencer ,"
                         }
                    }
                }
                if (unUsuario.level === 0) {
                    unUsuario.level = unUsuario.datosPersonales?.plan?.level ? unUsuario.datosPersonales?.plan?.level : 10; //o el nivel mas basico definido
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


