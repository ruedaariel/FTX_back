export declare class EmailService {
    private transporter;
    constructor();
    enviarCredenciales(email: string, passwordGenerada: string): Promise<void>;
    resetPassword(email: string, passwordGenerada: string): Promise<void>;
    enviarCambioContrasena(email: string): Promise<void>;
}
