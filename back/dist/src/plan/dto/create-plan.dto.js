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
exports.CreatePlanDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePlanDto {
    nombrePlan;
    descripcion;
    beneficios;
    noIncluye;
    precio;
}
exports.CreatePlanDto = CreatePlanDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: "El nombre del plan no debe ser vacio" }),
    (0, class_validator_1.IsString)({ message: "El nombre del plan debe ser una cadena de letras" }),
    (0, class_validator_1.MaxLength)(30, { message: "El nombre del plan debe tener 30 caracteres como máximo" }),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "nombrePlan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: "La descripción del plan no debe ser vacio" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Llos beneficios del plan no debe ser vacio' }),
    (0, class_validator_1.IsString)({ message: 'Los beneficios del Plan debe ser un string' }),
    (0, class_validator_1.MaxLength)(255, { message: 'El campo beneficios no puede superar los 255 caracteres' }),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "beneficios", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Los beneficios del Plan debe ser un string' }),
    (0, class_validator_1.MaxLength)(255, { message: 'El campo beneficios no puede superar los 255 caracteres' }),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "noIncluye", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: "El precio del plan no debe ser vacio" }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: "El precio del plan debe ser un numero (0 como mínimo)" }),
    (0, class_validator_1.Min)(0, { message: "El precio del plan debe ser 0 como mínimo" }),
    __metadata("design:type", Number)
], CreatePlanDto.prototype, "precio", void 0);
//# sourceMappingURL=create-plan.dto.js.map