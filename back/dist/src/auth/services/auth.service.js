"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const login_rta_dto_1 = require("../dto/login-rta.dto");
const estado_enum_1 = require("../../constantes/estado.enum");
const bcrypt = require("bcrypt");
const error_manager_1 = require("../../config/error.manager");
const class_transformer_1 = require("class-transformer");
const jwt = require("jsonwebtoken");
const transformar_fecha_1 = require("../../utils/transformar-fecha");
const ctes_login_1 = require("../../constantes/ctes-login");
const usuario_service_1 = require("../../usuario/services/usuario.service");
const pagos_service_1 = require("../../pagos/services/pagos.service");
const levels_plan_1 = require("../../constantes/levels-plan");
const random_password_1 = require("../../utils/random-password");
const email_service_1 = require("../../shared/email/email.service");
let AuthService = class AuthService {
    usuarioService;
    pagoService;
    emailService;
    constructor(usuarioService, pagoService, emailService) {
        this.usuarioService = usuarioService;
        this.pagoService = pagoService;
        this.emailService = emailService;
    }
    async loginUsuario(body) {
        try {
            const unUsuario = await this.usuarioService.findUsuarioByMail(body.email);
            if (!unUsuario) {
                throw new error_manager_1.ErrorManager('UNAUTHORIZED', 'Email incorrecto');
            }
            if (unUsuario.estado === estado_enum_1.ESTADO.ARCHIVADO) {
                throw new error_manager_1.ErrorManager('UNAUTHORIZED', 'Tu cuenta está inactiva.\nContactá al administrador para reactivarla.');
            }
            const passwordValida = await bcrypt.compare(body.password, unUsuario.password);
            if (!passwordValida) {
                throw new error_manager_1.ErrorManager('UNAUTHORIZED', 'password incorrecta');
            }
            const token = await this.generateJWT(unUsuario);
            let message = "";
            if (unUsuario.rol === "usuario") {
                const ultimosPagos = await this.pagoService.findPagosxId(unUsuario.id);
                console.log("ultimos pagos", ultimosPagos);
                if (!ultimosPagos || ultimosPagos.length === 0) {
                    const fecha = unUsuario.fCreacion instanceof Date ? unUsuario.fCreacion : new Date(unUsuario.fCreacion);
                    const limite = new Date(fecha.getTime());
                    limite.setDate(limite.getDate() + 3);
                    console.log(limite.getTime(), "----", Date.now());
                    if (limite.getTime() >= Date.now()) {
                        message = message + " nuevo ";
                        console.log("un nuevo tiene 3 dias para pagar");
                    }
                    else {
                        message = message + " impago ,";
                    }
                }
                else {
                    const fVencimientoDateOnly = (0, transformar_fecha_1.toLocalDateOnly)(ultimosPagos[0].fechaVencimiento);
                    const hoyDateOnly = (0, transformar_fecha_1.toLocalDateOnly)(new Date());
                    if (fVencimientoDateOnly.getTime() < hoyDateOnly.getTime()) {
                        message = message + " impago ,";
                    }
                    else {
                        const fProxima = new Date(fVencimientoDateOnly.getTime());
                        fProxima.setDate(fProxima.getDate() - ctes_login_1.DIAS_PROXIMOS);
                        if (fProxima.getTime() < hoyDateOnly.getTime()) {
                            message = message + " proximo a vencer ,";
                        }
                    }
                }
                if (unUsuario.level === 0) {
                    unUsuario.level = unUsuario.datosPersonales?.plan?.level ? unUsuario.datosPersonales?.plan?.level : levels_plan_1.PLAN_MENOR_LEVEL;
                    message = message + " primera vez , ";
                }
            }
            const usuarioRtaDto = (0, class_transformer_1.plainToInstance)(login_rta_dto_1.LoginRtaDto, {
                ...unUsuario, token, message
            }, { excludeExtraneousValues: true });
            return usuarioRtaDto;
        }
        catch (err) {
            console.error('Error al buscar ultimoPago', err.message, err.stack);
            throw error_manager_1.ErrorManager.handle(err);
        }
    }
    async resetPassw(body) {
        try {
            const unUsuario = await this.usuarioService.findUsuarioByMail(body.email);
            console.log("correo usuario a resetear", unUsuario);
            if (!unUsuario) {
                throw new error_manager_1.ErrorManager("BAD_REQUEST", "Correo no válido para una cuenta activa. \n ¿Necesitás cambiarlo? Contactar a tu trainer.");
            }
            if (unUsuario.estado === estado_enum_1.ESTADO.ARCHIVADO) {
                throw new error_manager_1.ErrorManager("BAD_REQUEST", "Tu cuenta está archivada. \n Contactá a tu personal trainer para reactivar tu acceso.");
            }
            const contrasenaGenerada = (0, random_password_1.generateRandomPassword)();
            const contrasenaHasheada = await bcrypt.hash(contrasenaGenerada, +process.env.HASH_SALT);
            const usuarioGuardado = await this.usuarioService.updateUsuario(unUsuario.id, { "datosBasicos": { "password": `${contrasenaGenerada}` } });
            setImmediate(async () => {
                try {
                    await this.emailService.resetPassword(body.email, contrasenaGenerada);
                }
                catch (error) {
                    throw error_manager_1.ErrorManager.handle(error);
                }
            });
            return true;
        }
        catch (error) {
            throw error_manager_1.ErrorManager.handle(error);
        }
    }
    async generateJWT(usuario) {
        const payload = {
            sub: usuario.id,
            email: usuario.email,
            rol: usuario.rol,
        };
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new Error('JWT_SECRET no definido en variables de entorno');
        return jwt.sign(payload, secret, { expiresIn: '2h' });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService,
        pagos_service_1.PagosService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map