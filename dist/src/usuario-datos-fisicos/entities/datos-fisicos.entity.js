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
exports.DatosFisicosEntity = void 0;
const estado_enum_1 = require("../../constantes/estado.enum");
const typeorm_1 = require("typeorm");
let DatosFisicosEntity = class DatosFisicosEntity {
    id;
    actividadDiaria;
    peso;
    estatura;
    metas;
    observaciones;
    estado;
};
exports.DatosFisicosEntity = DatosFisicosEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], DatosFisicosEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30 }),
    __metadata("design:type", String)
], DatosFisicosEntity.prototype, "actividadDiaria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 6, scale: 3 }),
    __metadata("design:type", Number)
], DatosFisicosEntity.prototype, "peso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], DatosFisicosEntity.prototype, "estatura", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], DatosFisicosEntity.prototype, "metas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], DatosFisicosEntity.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: estado_enum_1.ESTADO, default: estado_enum_1.ESTADO.ACTIVO }),
    __metadata("design:type", String)
], DatosFisicosEntity.prototype, "estado", void 0);
exports.DatosFisicosEntity = DatosFisicosEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'datos_fisicos' })
], DatosFisicosEntity);
//# sourceMappingURL=datos-fisicos.entity.js.map