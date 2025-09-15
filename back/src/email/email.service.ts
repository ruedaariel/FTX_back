// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    // Configura el "transporter" de nodemailer con tus credenciales SMTP
    // Por ejemplo, usando Gmail (para desarrollo, no para producción)
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'profherreratic@gmail.com',
        pass: 'gladys646596' // O usa una variable de entorno
      }
    });
  }

  async enviarCredenciales(email: string, passwordGenerada: string) {
    const mailOptions = {
      from: 'profherreratic@gmail.com',
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
    } catch (error) {
      console.error(`Error al enviar el correo a ${email}:`, error);
      throw new Error('No se pudo enviar el correo de bienvenida');
    }
  }
}