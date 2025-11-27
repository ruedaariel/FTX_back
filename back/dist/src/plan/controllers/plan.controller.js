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
exports.PlanController = void 0;
const common_1 = require("@nestjs/common");
const plan_service_1 = require("../services/plan.service");
const create_plan_dto_1 = require("../dto/create-plan.dto");
const update_plan_dto_1 = require("../dto/update-plan.dto");
const class_transformer_1 = require("class-transformer");
const plan_rta_completa_dto_1 = require("../dto/plan-rta-completa.dto");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const public_decorator_1 = require("../../auth/decorators/public.decorator");
let PlanController = class PlanController {
    planService;
    constructor(planService) {
        this.planService = planService;
    }
    create(createPlanDto) {
        return this.planService.create(createPlanDto);
    }
    findAll() {
        return this.planService.findAll();
    }
    findOne(id) {
        return (0, class_transformer_1.plainToInstance)(plan_rta_completa_dto_1.PlanRtaCompletaDto, this.planService.findOneById(id));
    }
    update(id, updatePlanDto) {
        return this.planService.update(id, updatePlanDto);
    }
    remove(id) {
        return this.planService.remove(id);
    }
};
exports.PlanController = PlanController;
__decorate([
    (0, roles_decorator_1.Rol)('ADMIN'),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_plan_dto_1.CreatePlanDto]),
    __metadata("design:returntype", void 0)
], PlanController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.PublicAccess)(),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlanController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Rol)('ADMIN'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlanController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Rol)('ADMIN'),
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_plan_dto_1.UpdatePlanDto]),
    __metadata("design:returntype", void 0)
], PlanController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Rol)('ADMIN'),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlanController.prototype, "remove", null);
exports.PlanController = PlanController = __decorate([
    (0, common_1.Controller)('plan'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [plan_service_1.PlanService])
], PlanController);
//# sourceMappingURL=plan.controller.js.map