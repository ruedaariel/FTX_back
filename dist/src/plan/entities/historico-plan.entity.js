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
exports.HistoricoPlanEntity = void 0;
const typeorm_1 = require("typeorm");
const plan_entity_1 = require("./plan.entity");
let HistoricoPlanEntity = class HistoricoPlanEntity {
    idPlanHistorico;
    idPlanOrigen;
    nombrePlan;
    descripcion;
    beneficios;
    noIncluye;
    precio;
    level;
    fCambioInicio;
    fCambioFin;
    detalleCambio;
    plan;
};
exports.HistoricoPlanEntity = HistoricoPlanEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HistoricoPlanEntity.prototype, "idPlanHistorico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], HistoricoPlanEntity.prototype, "idPlanOrigen", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30 }),
    __metadata("design:type", String)
], HistoricoPlanEntity.prototype, "nombrePlan", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], HistoricoPlanEntity.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], HistoricoPlanEntity.prototype, "beneficios", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], HistoricoPlanEntity.prototype, "noIncluye", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 8, scale: 2 }),
    __metadata("design:type", Number)
], HistoricoPlanEntity.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', default: 0 }),
    __metadata("design:type", Number)
], HistoricoPlanEntity.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], HistoricoPlanEntity.prototype, "fCambioInicio", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], HistoricoPlanEntity.prototype, "fCambioFin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], HistoricoPlanEntity.prototype, "detalleCambio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plan_entity_1.PlanEntity, plan => plan.historicoPlanes, { nullable: true, onDelete: 'SET NULL', }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], HistoricoPlanEntity.prototype, "plan", void 0);
exports.HistoricoPlanEntity = HistoricoPlanEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'historico_plan' })
], HistoricoPlanEntity);
//# sourceMappingURL=historico-plan.entity.js.map