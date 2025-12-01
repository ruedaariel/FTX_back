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
exports.FileImgService = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs");
const error_manager_1 = require("../../config/error.manager");
const config_1 = require("@nestjs/config");
let FileImgService = class FileImgService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    async borrarImagen(nombreArchivo, directorio) {
        if (nombreArchivo) {
            const rutaBaseProyecto = process.cwd();
            const rutaImagen = path.join(rutaBaseProyecto, 'uploads', `${directorio}`, nombreArchivo);
            try {
                await fs.promises.unlink(rutaImagen);
                return true;
            }
            catch (err) {
                throw error_manager_1.ErrorManager.handle(err);
            }
        }
        return false;
    }
    construirUrlImagen(nombreArchivo, directorio) {
        const baseUrl = `${process.env.BACKEND_URL}/uploads/${directorio}/`;
        return nombreArchivo ? baseUrl + nombreArchivo : "";
    }
};
exports.FileImgService = FileImgService;
exports.FileImgService = FileImgService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FileImgService);
//# sourceMappingURL=file-img.service.js.map