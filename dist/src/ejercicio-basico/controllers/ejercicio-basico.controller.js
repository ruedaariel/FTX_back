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
exports.EjercicioBasicoController = void 0;
const common_1 = require("@nestjs/common");
const ejercicio_basico_service_1 = require("../services/ejercicio-basico.service");
const create_ejercicio_basico_dto_1 = require("../dto/create-ejercicio-basico.dto");
const update_ejercicio_basico_dto_1 = require("../dto/update-ejercicio-basico.dto");
const imagen_ejercicio_interceptor_1 = require("../../interceptors/imagen-ejercicio.interceptor");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
let EjercicioBasicoController = class EjercicioBasicoController {
    ejercicioBasicoService;
    constructor(ejercicioBasicoService) {
        this.ejercicioBasicoService = ejercicioBasicoService;
    }
    async createEjercicioBasico(file, body) {
        body.imagenLink = file?.filename || null;
        return this.ejercicioBasicoService.createEjercicioBasico(body);
    }
    findAll() {
        return this.ejercicioBasicoService.findAll();
    }
    update(id, updateEjercicioBasicoDto, file) {
        if (file?.filename) {
            updateEjercicioBasicoDto.imagenLink = file?.filename;
        }
        return this.ejercicioBasicoService.update(id, updateEjercicioBasicoDto);
    }
    remove(id) {
        return this.ejercicioBasicoService.remove(id);
    }
};
exports.EjercicioBasicoController = EjercicioBasicoController;
__decorate([
    (0, roles_decorator_1.Rol)('ADMIN'),
    (0, common_1.Post)('register'),
    (0, common_1.UseInterceptors)((0, imagen_ejercicio_interceptor_1.imagenEjercicioInterceptor)()),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_ejercicio_basico_dto_1.CreateEjercicioBasicoDto]),
    __metadata("design:returntype", Promise)
], EjercicioBasicoController.prototype, "createEjercicioBasico", null);
__decorate([
    (0, roles_decorator_1.Rol)('ADMIN'),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EjercicioBasicoController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Rol)('ADMIN'),
    (0, common_1.Patch)('update/:id'),
    (0, common_1.UseInterceptors)((0, imagen_ejercicio_interceptor_1.imagenEjercicioInterceptor)()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_ejercicio_basico_dto_1.UpdateEjercicioBasicoDto, Object]),
    __metadata("design:returntype", void 0)
], EjercicioBasicoController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Rol)('ADMIN'),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EjercicioBasicoController.prototype, "remove", null);
exports.EjercicioBasicoController = EjercicioBasicoController = __decorate([
    (0, common_1.Controller)('ejbasico'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [ejercicio_basico_service_1.EjercicioBasicoService])
], EjercicioBasicoController);
//# sourceMappingURL=ejercicio-basico.controller.js.map