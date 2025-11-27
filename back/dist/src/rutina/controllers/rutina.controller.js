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
exports.RutinaController = void 0;
const common_1 = require("@nestjs/common");
const rutina_service_1 = require("../services/rutina.service");
const create_rutina_dto_1 = require("../dto/create-rutina.dto");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const estado_dto_1 = require("../dto/estado.dto");
const access_level_guard_1 = require("../../auth/guards/access-level.guard");
const class_transformer_1 = require("class-transformer");
const rta_rutina_dto_1 = require("../dto/rta-rutina.dto");
const rta_rutina_estadistica_dto_1 = require("../dto/rta-rutina-estadistica.dto");
let RutinaController = class RutinaController {
    rutinaService;
    constructor(rutinaService) {
        this.rutinaService = rutinaService;
    }
    async registerRutina(createRutinaDto) {
        return this.rutinaService.createRutina(createRutinaDto);
    }
    async findAllRutinas() {
        return this.rutinaService.findAllRutinas();
    }
    async findRutinaById(id) {
        const unaRutina = this.rutinaService.findRutinaById(id);
        const unaRutinaDto = (0, class_transformer_1.plainToInstance)(rta_rutina_dto_1.RtaRutinaDto, unaRutina, { excludeExtraneousValues: true });
        return unaRutinaDto;
    }
    async findRutinaByIdEstadistica(id) {
        const unaRutina = this.rutinaService.findRutinaById(id);
        const unaRutinaDto = (0, class_transformer_1.plainToInstance)(rta_rutina_estadistica_dto_1.RtaRutinaEstadisticaDto, unaRutina, { excludeExtraneousValues: true });
        return unaRutinaDto;
    }
    async update(id, rutinaDto) {
        return this.rutinaService.updateRutina(id, rutinaDto);
    }
    async deleteRutina(id) {
        return this.rutinaService.deleteRutina(id);
    }
    async updateEstado(id, body) {
        return this.rutinaService.updateEstado(id, body);
    }
};
exports.RutinaController = RutinaController;
__decorate([
    (0, roles_decorator_1.Rol)('ADMIN'),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rutina_dto_1.CreateRutinaDto]),
    __metadata("design:returntype", Promise)
], RutinaController.prototype, "registerRutina", null);
__decorate([
    (0, roles_decorator_1.Rol)('ADMIN'),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RutinaController.prototype, "findAllRutinas", null);
__decorate([
    (0, roles_decorator_1.Rol)('USUARIO'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RutinaController.prototype, "findRutinaById", null);
__decorate([
    (0, roles_decorator_1.Rol)('ADMIN'),
    (0, common_1.Get)('seguimiento/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RutinaController.prototype, "findRutinaByIdEstadistica", null);
__decorate([
    (0, roles_decorator_1.Rol)('ADMIN'),
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_rutina_dto_1.CreateRutinaDto]),
    __metadata("design:returntype", Promise)
], RutinaController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Rol)('ADMIN'),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RutinaController.prototype, "deleteRutina", null);
__decorate([
    (0, roles_decorator_1.Rol)('USUARIO'),
    (0, common_1.Put)('updateEstado/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, estado_dto_1.EstadoDto]),
    __metadata("design:returntype", Promise)
], RutinaController.prototype, "updateEstado", null);
exports.RutinaController = RutinaController = __decorate([
    (0, common_1.Controller)('rutina'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard, access_level_guard_1.AccessLevelGuard),
    __metadata("design:paramtypes", [rutina_service_1.RutinaService])
], RutinaController);
//# sourceMappingURL=rutina.controller.js.map