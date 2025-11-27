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
exports.DatosFisicosRtaDto = void 0;
const class_transformer_1 = require("class-transformer");
const estado_enum_1 = require("../../constantes/estado.enum");
class DatosFisicosRtaDto {
    id;
    actividadDiaria;
    peso;
    estatura;
    metas;
    observaciones;
    estado;
}
exports.DatosFisicosRtaDto = DatosFisicosRtaDto;
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], DatosFisicosRtaDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DatosFisicosRtaDto.prototype, "actividadDiaria", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DatosFisicosRtaDto.prototype, "peso", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DatosFisicosRtaDto.prototype, "estatura", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DatosFisicosRtaDto.prototype, "metas", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DatosFisicosRtaDto.prototype, "observaciones", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], DatosFisicosRtaDto.prototype, "estado", void 0);
//# sourceMappingURL=datos-fisicos-rta.dto.js.map