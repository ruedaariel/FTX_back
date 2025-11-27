"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagenPerfilInterceptor = void 0;
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const error_manager_1 = require("../config/error.manager");
const imagenPerfilInterceptor = () => (0, platform_express_1.FileInterceptor)('imagenPerfil', {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/perfiles',
        filename: (req, file, cb) => {
            const uniqueName = Date.now() + '-' + file.originalname;
            cb(null, uniqueName);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
            return cb(new error_manager_1.ErrorManager('BAD_REQUEST', 'Solo se permiten imágenes JPG, JPEG, WEBP o PNG para perfiles.'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE || '2097152'),
    },
});
exports.imagenPerfilInterceptor = imagenPerfilInterceptor;
//# sourceMappingURL=imagen-perfil.interceptor.js.map