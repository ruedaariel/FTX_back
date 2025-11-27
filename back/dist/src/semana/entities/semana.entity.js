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
exports.SemanaEntity = exports.ESTADOSEMANA = void 0;
const dia_entity_1 = require("../../dia/entities/dia.entity");
const rutina_entity_1 = require("../../rutina/entities/rutina.entity");
const typeorm_1 = require("typeorm");
var ESTADOSEMANA;
(function (ESTADOSEMANA) {
    ESTADOSEMANA["ENPROCESO"] = "en proceso";
    ESTADOSEMANA["TERMINADA"] = "terminada";
    ESTADOSEMANA["NOINICIADA"] = "no iniciada";
})(ESTADOSEMANA || (exports.ESTADOSEMANA = ESTADOSEMANA = {}));
let SemanaEntity = class SemanaEntity {
    idSemana;
    nroSemana;
    estadoSemana;
    rutina;
    dias;
};
exports.SemanaEntity = SemanaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SemanaEntity.prototype, "idSemana", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 1,
    }),
    __metadata("design:type", String)
], SemanaEntity.prototype, "nroSemana", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ESTADOSEMANA, nullable: false, }),
    __metadata("design:type", String)
], SemanaEntity.prototype, "estadoSemana", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rutina_entity_1.RutinaEntity, rutina => rutina.semanas, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", rutina_entity_1.RutinaEntity)
], SemanaEntity.prototype, "rutina", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dia_entity_1.DiaEntity, dia => dia.semana, { cascade: true }),
    __metadata("design:type", Array)
], SemanaEntity.prototype, "dias", void 0);
exports.SemanaEntity = SemanaEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'semana' })
], SemanaEntity);
//# sourceMappingURL=semana.entity.js.map