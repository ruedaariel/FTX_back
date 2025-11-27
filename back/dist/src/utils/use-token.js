"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToken = void 0;
const jwt = require("jsonwebtoken");
const useToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            ignoreExpiration: true
        });
        if (typeof decoded === 'object' &&
            decoded !== null &&
            'email' in decoded &&
            'rol' in decoded) {
            const payload = decoded;
            const currentDateMs = new Date().getTime();
            const expiresDateMs = payload.exp * 1000;
            return {
                sub: payload.sub,
                email: payload.email,
                rol: payload.rol,
                isExpired: expiresDateMs <= currentDateMs
            };
        }
        else {
            throw new Error('Token inválido o incompleto');
        }
    }
    catch (error) {
        return 'Token invalido de usetoken';
    }
};
exports.useToken = useToken;
//# sourceMappingURL=use-token.js.map