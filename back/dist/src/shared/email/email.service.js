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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let EmailService = class EmailService {
    transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'usuarionuevo.ftx@gmail.com',
                pass: 'wxsw lyfa tyum ojuu'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }
    async enviarCredenciales(email, passwordGenerada) {
        const mailOptions = {
            from: 'usuarionuevo.ftx@gmail.com',
            to: email,
            subject: '¡Bienvenido! Aquí están tus credenciales de acceso',
            html: `<p>Hola,</p>
             <p>Tu cuenta ha sido creada exitosamente. Tu contraseña es: <strong>${passwordGenerada}</strong></p>
             <p>Por favor, cámbiala en tu primer inicio de sesión.</p>
             <p>Saludos,</p>
             <p>Tu Equipo</p>`,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Correo enviado a: ${email}`);
        }
        catch (error) {
            console.error(`Error al enviar el correo a ${email}:`, error);
            throw new Error('No se pudo enviar el correo de bienvenida');
        }
    }
    async resetPassword(email, passwordGenerada) {
        const mailOptions = {
            from: 'usuarionuevo.ftx@gmail.com',
            to: email,
            subject: '¡Hola! Restablecé tu contraseña',
            html: `<p>Hola,</p>
             <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
             <p> Tu nueva contraseña es <strong>${passwordGenerada}</strong></p>
             <p>Por favor, cámbiala en tu primer inicio de sesión.</p>
             <p>Saludos,</p>
             <p>Tu Equipo</p>`,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Correo enviado a: ${email}`);
        }
        catch (error) {
            console.error(`Error al enviar el correo a ${email}:`, error);
            throw new Error('No se pudo enviar el correo de bienvenida');
        }
    }
    async enviarCambioContrasena(email) {
        const mailOptions = {
            from: 'usuarionuevo.ftx@gmail.com',
            to: email,
            subject: 'Cambio de Contraseña',
            html: `<p>Hola,</p>
             <p>Te informamos que tu contraseña ha cambiado en tu cuenta FTX</p>
             <p>Saludos,</p>
             <p>Tu Equipo</p>`,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Correo enviado a: ${email}`);
        }
        catch (error) {
            console.error(`Error al enviar el correo a ${email}:`, error);
            throw new Error('No se pudo enviar el correo de bienvenida');
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map