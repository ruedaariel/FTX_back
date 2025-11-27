"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomPassword = generateRandomPassword;
function generateRandomPassword() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 8;
    let password = '';
    password += chars.charAt(Math.floor(Math.random() * 10) + 52);
    password += chars.charAt(Math.floor(Math.random() * 26));
    password += chars.charAt(Math.floor(Math.random() * 26) + 26);
    for (let i = 3; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}
//# sourceMappingURL=random-password.js.map