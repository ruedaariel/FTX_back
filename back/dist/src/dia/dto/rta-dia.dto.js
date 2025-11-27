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
exports.RtaDiaDto = void 0;
const class_transformer_1 = require("class-transformer");
const rta_ejercicio_rutina_dto_1 = require("../../ejercicio-rutina/dto/rta-ejercicio-rutina.dto");
class RtaDiaDto {
    idDia;
    nroDia;
    focus;
    ejerciciosRutina;
}
exports.RtaDiaDto = RtaDiaDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], RtaDiaDto.prototype, "idDia", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RtaDiaDto.prototype, "nroDia", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RtaDiaDto.prototype, "focus", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => rta_ejercicio_rutina_dto_1.RtaEjercicioRutinaDto),
    __metadata("design:type", Array)
], RtaDiaDto.prototype, "ejerciciosRutina", void 0);
//# sourceMappingURL=rta-dia.dto.js.map