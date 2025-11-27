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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("../services/usuario.service");
const create_usuario_dto_1 = require("../dto/create-usuario.dto");
const update_usuario_dto_1 = require("../dto/update-usuario.dto");
const imagen_perfil_interceptor_1 = require("../../interceptors/imagen-perfil.interceptor");
const error_manager_1 = require("../../config/error.manager");
const update_Usuario_adm_dto_1 = require("../dto/update-Usuario-adm.dto");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const access_level_guard_1 = require("../../auth/guards/access-level.guard");
const public_decorator_1 = require("../../auth/decorators/public.decorator");
const class_transformer_1 = require("class-transformer");
const usuario_rta_dto_1 = require("../dto/usuario-rta.dto");
const access_level_decorator_1 = require("../../auth/decorators/access-level.decorator");
let UsuarioController = class UsuarioController {
    usuarioService;
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    async registerUsuario(body) {
        return await this.usuarioService.createUsuario(body);
    }
    async findAllUsuarios() {
        return await this.usuarioService.findAllUsuarios();
    }
    async findUsuarioById(id) {
        const unUsuario = await this.usuarioService.findUsuarioById(id);
        const usuarioRtaDto = (0, class_transformer_1.plainToInstance)(usuario_rta_dto_1.UsuarioRtaDto, unUsuario);
        return usuarioRtaDto;
    }
    async findRutinasxId(id) {
        return await this.usuarioService.findRutinasxId(id);
    }
    async findRutinasxIdEstadistica(id) {
        return await this.usuarioService.findRutinasxId(id);
    }
    async update(id, updateUsuarioDto) {
        return await this.usuarioService.updateUsuario(id, updateUsuarioDto);
    }
    async updateImagenPerfil(id, file) {
        if (!file) {
            throw new error_manager_1.ErrorManager('BAD_REQUEST', 'No se ha subido ningún archivo.');
        }
        const imagenActualizada = await this.usuarioService.updateImagenPerfil(id, file.filename);
        return imagenActualizada;
    }
    async updateBasico(id, updateUsuarioAdmDto) {
        return await this.usuarioService.updateUsuarioBasico(id, updateUsuarioAdmDto);
    }
    async deleteUsuario(id) {
        return await this.usuarioService.deleteUsuario(+id);
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, public_decorator_1.PublicAccess)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_usuario_dto_1.CreateUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "registerUsuario", null);
__decorate([
    (0, roles_decorator_1.Rol)('ADMIN'),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "findAllUsuarios", null);
__decorate([
    (0, roles_decorator_1.Rol)('USUARIO'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "findUsuarioById", null);
__decorate([
    (0, roles_decorator_1.Rol)('USUARIO'),
    (0, common_1.Get)('rutinas/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "findRutinasxId", null);
__decorate([
    (0, access_level_decorator_1.AccessLevel)(30),
    (0, common_1.Get)('rutinasEstadistica/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "findRutinasxIdEstadistica", null);
__decorate([
    (0, roles_decorator_1.Rol)('USUARIO'),
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_usuario_dto_1.UpdateUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Rol)('USUARIO'),
    (0, common_1.Patch)(':id/imagen-perfil'),
    (0, common_1.UseInterceptors)((0, imagen_perfil_interceptor_1.imagenPerfilInterceptor)()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "updateImagenPerfil", null);
__decorate([
    (0, roles_decorator_1.Rol)('ADMIN'),
    (0, common_1.Patch)('update-basico/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_Usuario_adm_dto_1.UpdateUsuarioAdmDto]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "updateBasico", null);
__decorate([
    (0, roles_decorator_1.Rol)('ADMIN'),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "deleteUsuario", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, common_1.Controller)('usuario'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard, access_level_guard_1.AccessLevelGuard),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UsuarioController);
//# sourceMappingURL=usuario.controller.js.map