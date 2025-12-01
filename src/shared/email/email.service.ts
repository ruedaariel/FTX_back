import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor() {
    // Configurar la API Key de SendGrid desde variables de entorno
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  }

  async enviarCredenciales(email: string, passwordGenerada: string) {
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM!, // remitente verificado en SendGrid
      subject: '¡Bienvenido! Aquí están tus credenciales de acceso',
      html: `<p>Hola,</p>
             <p>Tu cuenta ha sido creada exitosamente. Tu contraseña es: <strong>${passwordGenerada}</strong></p>
             <p>Por favor, cámbiala en tu primer inicio de sesión.</p>
             <p>Saludos,</p>
             <p>Tu Equipo</p>`,
    };

    try {
      await sgMail.send(msg);
      console.log(`Correo de bienvenida enviado a: ${email}`);
    } catch (error) {
      console.error(`Error al enviar el correo a ${email}:`, error);
      throw new Error('No se pudo enviar el correo de bienvenida');
    }
  }

  async resetPassword(email: string, passwordGenerada: string) {
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM!,
      subject: '¡Hola! Restablecé tu contraseña',
      html: `<p>Hola,</p>
             <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
             <p>Tu nueva contraseña es <strong>${passwordGenerada}</strong></p>
             <p>Por favor, cámbiala en tu primer inicio de sesión.</p>
             <p>Saludos,</p>
             <p>Tu Equipo</p>`,
    };

    try {
      await sgMail.send(msg);
      console.log(`Correo de reset enviado a: ${email}`);
    } catch (error) {
      console.error(`Error al enviar el correo a ${email}:`, error);
      throw new Error('No se pudo enviar el correo de reset');
    }
  }

  async enviarCambioContrasena(email: string) {
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM!,
      subject: 'Cambio de Contraseña',
      html: `<p>Hola,</p>
             <p>Te informamos que tu contraseña ha cambiado en tu cuenta FTX.</p>
             <p>Saludos,</p>
             <p>Tu Equipo</p>`,
    };

    try {
      await sgMail.send(msg);
      console.log(`Correo de cambio de contraseña enviado a: ${email}`);
    } catch (error) {
      console.error(`Error al enviar el correo a ${email}:`, error);
      throw new Error('No se pudo enviar el correo de cambio de contraseña');
    }
  }
}
