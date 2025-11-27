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
exports.DiaEntity = void 0;
const ejercicio_rutina_entity_1 = require("../../ejercicio-rutina/entities/ejercicio-rutina.entity");
const semana_entity_1 = require("../../semana/entities/semana.entity");
const typeorm_1 = require("typeorm");
let DiaEntity = class DiaEntity {
    idDia;
    nroDia;
    focus;
    semana;
    ejerciciosRutina;
};
exports.DiaEntity = DiaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DiaEntity.prototype, "idDia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1, }),
    __metadata("design:type", String)
], DiaEntity.prototype, "nroDia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', }),
    __metadata("design:type", String)
], DiaEntity.prototype, "focus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => semana_entity_1.SemanaEntity, semana => semana.dias, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", semana_entity_1.SemanaEntity)
], DiaEntity.prototype, "semana", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ejercicio_rutina_entity_1.EjercicioRutinaEntity, ejercicioRutina => ejercicioRutina.dia, { cascade: true }),
    __metadata("design:type", Array)
], DiaEntity.prototype, "ejerciciosRutina", void 0);
exports.DiaEntity = DiaEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'dia' })
], DiaEntity);
//# sourceMappingURL=dia.entity.js.map