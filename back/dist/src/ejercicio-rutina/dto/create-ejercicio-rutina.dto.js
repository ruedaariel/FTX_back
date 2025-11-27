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
exports.CreateEjercicioRutinaDto = void 0;
const class_validator_1 = require("class-validator");
class CreateEjercicioRutinaDto {
    repeticiones;
    dificultad;
    peso;
    observaciones;
    ejercicioHecho;
    idEjercicioBasico;
}
exports.CreateEjercicioRutinaDto = CreateEjercicioRutinaDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Las repeticiones deben ser un texto (ej: "4x12").' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Las repeticiones no pueden estar vacías.' }),
    (0, class_validator_1.MaxLength)(30, { message: 'Las repeticiones no deben exceder los 30 caracteres.' }),
    __metadata("design:type", String)
], CreateEjercicioRutinaDto.prototype, "repeticiones", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La dificultad debe ser un texto.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La dificultad no puede estar vacía.' }),
    (0, class_validator_1.MaxLength)(30, { message: 'La dificultad no debe exceder los 30 caracteres.' }),
    __metadata("design:type", String)
], CreateEjercicioRutinaDto.prototype, "dificultad", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'El peso debe ser un número.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El peso no puede estar vacío.' }),
    (0, class_validator_1.Min)(0, { message: 'El peso debe ser un numero positivo o 0kg' }),
    (0, class_validator_1.Max)(500, { message: 'El peso debe ser como máximo 500kg' }),
    __metadata("design:type", Number)
], CreateEjercicioRutinaDto.prototype, "peso", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEjercicioRutinaDto.prototype, "observaciones", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateEjercicioRutinaDto.prototype, "ejercicioHecho", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El ID del ejercicio básico no puede estar vacío.' }),
    __metadata("design:type", Number)
], CreateEjercicioRutinaDto.prototype, "idEjercicioBasico", void 0);
//# sourceMappingURL=create-ejercicio-rutina.dto.js.map