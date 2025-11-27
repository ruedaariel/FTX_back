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
exports.EjercicioRutinaEntity = void 0;
const dia_entity_1 = require("../../dia/entities/dia.entity");
const ejercicio_basico_entity_1 = require("../../ejercicio-basico/entities/ejercicio-basico.entity");
const typeorm_1 = require("typeorm");
let EjercicioRutinaEntity = class EjercicioRutinaEntity {
    idEjercicioRutina;
    repeticiones;
    dificultad;
    peso;
    observaciones;
    ejercicioHecho = false;
    dia;
    ejercicioBasico;
};
exports.EjercicioRutinaEntity = EjercicioRutinaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EjercicioRutinaEntity.prototype, "idEjercicioRutina", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, }),
    __metadata("design:type", String)
], EjercicioRutinaEntity.prototype, "repeticiones", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, }),
    __metadata("design:type", String)
], EjercicioRutinaEntity.prototype, "dificultad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 6, scale: 3 }),
    __metadata("design:type", Number)
], EjercicioRutinaEntity.prototype, "peso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], EjercicioRutinaEntity.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], EjercicioRutinaEntity.prototype, "ejercicioHecho", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dia_entity_1.DiaEntity, dia => dia.ejerciciosRutina, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", dia_entity_1.DiaEntity)
], EjercicioRutinaEntity.prototype, "dia", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ejercicio_basico_entity_1.EjercicioBasicoEntity, ejercicioBasico => ejercicioBasico.ejerciciosRutina, { onDelete: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", ejercicio_basico_entity_1.EjercicioBasicoEntity)
], EjercicioRutinaEntity.prototype, "ejercicioBasico", void 0);
exports.EjercicioRutinaEntity = EjercicioRutinaEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'ejercicio_rutina' })
], EjercicioRutinaEntity);
//# sourceMappingURL=ejercicio-rutina.entity.js.map