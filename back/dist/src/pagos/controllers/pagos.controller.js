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
exports.PagosController = void 0;
const common_1 = require("@nestjs/common");
const pagos_service_1 = require("../services/pagos.service");
const create_pago_dto_1 = require("../dto/create-pago.dto");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const class_transformer_1 = require("class-transformer");
const rta_pago_dto_1 = require("../dto/rta-pago.dto");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
let PagosController = class PagosController {
    pagosService;
    constructor(pagosService) {
        this.pagosService = pagosService;
    }
    async registrarPagoManual(createPagoDto) {
        const pagoGuardado = await this.pagosService.guardarPagoManual(createPagoDto);
        return {
            message: 'Pago manual registrado exitosamente',
            pago: true,
        };
    }
    async obtenerTodosLosPagos() {
        return await this.pagosService.obtenerTodosLosPagos();
    }
    async obtenerImpagos() {
        return await this.pagosService.obtenerImpagos();
    }
    async obtenerPagoPorId(id) {
        const pagos = await this.pagosService.findPagosxId(id);
        const pagosDto = (0, class_transformer_1.plainToInstance)(rta_pago_dto_1.RtaPagoDto, pagos, { excludeExtraneousValues: true });
        return pagosDto;
    }
};
exports.PagosController = PagosController;
__decorate([
    (0, roles_decorator_1.Rol)('ADMIN'),
    (0, common_1.Post)('/manual'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pago_dto_1.CreatePagoDto]),
    __metadata("design:returntype", Promise)
], PagosController.prototype, "registrarPagoManual", null);
__decorate([
    (0, roles_decorator_1.Rol)('ADMIN'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PagosController.prototype, "obtenerTodosLosPagos", null);
__decorate([
    (0, roles_decorator_1.Rol)('ADMIN'),
    (0, common_1.Get)('/impagos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PagosController.prototype, "obtenerImpagos", null);
__decorate([
    (0, roles_decorator_1.Rol)('USUARIO'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PagosController.prototype, "obtenerPagoPorId", null);
exports.PagosController = PagosController = __decorate([
    (0, common_1.Controller)('pagos'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [pagos_service_1.PagosService])
], PagosController);
//# sourceMappingURL=pagos.controller.js.map