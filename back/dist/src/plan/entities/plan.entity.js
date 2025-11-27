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
exports.PlanEntity = void 0;
const datos_personales_entity_1 = require("../../usuario-datos-personales/entities/datos-personales.entity");
const typeorm_1 = require("typeorm");
const historico_plan_entity_1 = require("./historico-plan.entity");
let PlanEntity = class PlanEntity {
    idPlan;
    nombrePlan;
    descripcion;
    beneficios;
    noIncluye;
    precio;
    level;
    fCambio;
    datosPersonales;
    historicoPlanes;
};
exports.PlanEntity = PlanEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PlanEntity.prototype, "idPlan", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, unique: true }),
    __metadata("design:type", String)
], PlanEntity.prototype, "nombrePlan", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], PlanEntity.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], PlanEntity.prototype, "beneficios", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], PlanEntity.prototype, "noIncluye", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 8, scale: 2 }),
    __metadata("design:type", Number)
], PlanEntity.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', default: 0 }),
    __metadata("design:type", Number)
], PlanEntity.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp'
    }),
    __metadata("design:type", Date)
], PlanEntity.prototype, "fCambio", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => datos_personales_entity_1.DatosPersonalesEntity, datosPersonales => datosPersonales.plan),
    __metadata("design:type", Array)
], PlanEntity.prototype, "datosPersonales", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => historico_plan_entity_1.HistoricoPlanEntity, historicoPlan => historicoPlan.plan),
    __metadata("design:type", Array)
], PlanEntity.prototype, "historicoPlanes", void 0);
exports.PlanEntity = PlanEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'plan' })
], PlanEntity);
//# sourceMappingURL=plan.entity.js.map