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
exports.CreateDatosFisicosDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateDatosFisicosDto {
    actividadDiaria;
    peso;
    estatura;
    metas;
    observaciones;
}
exports.CreateDatosFisicosDto = CreateDatosFisicosDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La actividad diaria no puede estar vacía' }),
    (0, class_validator_1.IsString)({ message: 'La actividad diaria debe ser un texto' }),
    __metadata("design:type", String)
], CreateDatosFisicosDto.prototype, "actividadDiaria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El peso no puede estar vacío' }),
    (0, class_validator_1.IsNumber)({}, { message: 'El peso debe ser un número' }),
    (0, class_validator_1.Min)(30, { message: 'El peso debe ser al menos 30kg' }),
    (0, class_validator_1.Max)(150, { message: 'El peso debe ser como máximo 150kg' }),
    __metadata("design:type", Number)
], CreateDatosFisicosDto.prototype, "peso", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La estatura no puede estar vacía' }),
    (0, class_validator_1.IsNumber)({}, { message: 'La estatura debe ser un número' }),
    (0, class_validator_1.Min)(50, { message: 'La estatura debe ser al menos 50cm' }),
    (0, class_validator_1.Max)(250, { message: 'La estatura debe ser como máximo 250cm' }),
    __metadata("design:type", Number)
], CreateDatosFisicosDto.prototype, "estatura", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Las metas no pueden estar vacías' }),
    (0, class_validator_1.IsString)({ message: 'Las metas deben ser un texto' }),
    __metadata("design:type", String)
], CreateDatosFisicosDto.prototype, "metas", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Las observaciones deben ser texto si se incluyen' }),
    __metadata("design:type", String)
], CreateDatosFisicosDto.prototype, "observaciones", void 0);
//# sourceMappingURL=create-datos-fisicos.dto.js.map