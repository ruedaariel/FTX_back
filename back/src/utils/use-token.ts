import { IauthTokenResult, IuseToken } from "src/interfaces/auth.interface";
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): IuseToken | string => {
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as unknown; //sino daba error, recibe cualquier cosa

        if (
            typeof decoded === 'object' &&
            decoded !== null &&
            'email' in decoded &&
            'rol' in decoded
        ) {
            const payload = decoded as IauthTokenResult;
            const currentDate = new Date();
            const expiresDate = new Date(payload.exp);
            return {
                sub: payload.sub,
                email: payload.email,
                rol: payload.rol,
                isExpired: +expiresDate <= +currentDate / 1000 // /1000 para convertir la fecha a seg
            }
        } else {
            throw new Error('Token inválido o incompleto');
        }


    } catch (error) {
        return 'Token invalido'
    }
}