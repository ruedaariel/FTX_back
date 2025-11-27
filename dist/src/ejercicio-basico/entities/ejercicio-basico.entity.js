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
exports.EjercicioBasicoEntity = void 0;
const ejercicio_rutina_entity_1 = require("../../ejercicio-rutina/entities/ejercicio-rutina.entity");
const typeorm_1 = require("typeorm");
let EjercicioBasicoEntity = class EjercicioBasicoEntity {
    idEjercicioBasico;
    nombreEjercicio;
    observaciones;
    imagenLink;
    videoLink;
    ejerciciosRutina;
};
exports.EjercicioBasicoEntity = EjercicioBasicoEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EjercicioBasicoEntity.prototype, "idEjercicioBasico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 60, unique: true }),
    __metadata("design:type", String)
], EjercicioBasicoEntity.prototype, "nombreEjercicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], EjercicioBasicoEntity.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], EjercicioBasicoEntity.prototype, "imagenLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], EjercicioBasicoEntity.prototype, "videoLink", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ejercicio_rutina_entity_1.EjercicioRutinaEntity, ejercicioRutina => ejercicioRutina.ejercicioBasico),
    __metadata("design:type", Array)
], EjercicioBasicoEntity.prototype, "ejerciciosRutina", void 0);
exports.EjercicioBasicoEntity = EjercicioBasicoEntity = __decorate([
    (0, typeorm_1.Entity)('ejercicio_basico')
], EjercicioBasicoEntity);
//# sourceMappingURL=ejercicio-basico.entity.js.map