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
exports.RtaEjercicioRutinaDto = void 0;
const class_transformer_1 = require("class-transformer");
const rta_ejercicio_basico_dto_1 = require("../../ejercicio-basico/dto/rta-ejercicio-basico.dto");
class RtaEjercicioRutinaDto {
    idEjercicioRutina;
    repeticiones;
    dificultad;
    peso;
    observaciones;
    ejercicioHecho = false;
    ejercicioBasico;
}
exports.RtaEjercicioRutinaDto = RtaEjercicioRutinaDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], RtaEjercicioRutinaDto.prototype, "idEjercicioRutina", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RtaEjercicioRutinaDto.prototype, "repeticiones", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RtaEjercicioRutinaDto.prototype, "dificultad", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], RtaEjercicioRutinaDto.prototype, "peso", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RtaEjercicioRutinaDto.prototype, "observaciones", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], RtaEjercicioRutinaDto.prototype, "ejercicioHecho", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => rta_ejercicio_basico_dto_1.RtaEjercicioBasicoDto),
    __metadata("design:type", rta_ejercicio_basico_dto_1.RtaEjercicioBasicoDto)
], RtaEjercicioRutinaDto.prototype, "ejercicioBasico", void 0);
//# sourceMappingURL=rta-ejercicio-rutina.dto.js.map