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
exports.CreateDiaDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_ejercicio_rutina_dto_1 = require("../../ejercicio-rutina/dto/create-ejercicio-rutina.dto");
class CreateDiaDto {
    nroDia;
    focus;
    ejerciciosRutina;
}
exports.CreateDiaDto = CreateDiaDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'El número de día debe ser un texto.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El número de día no puede estar vacío.' }),
    (0, class_validator_1.Length)(1, 1, { message: 'El número de día debe tener 1 caracter.' }),
    (0, class_validator_1.Matches)(/^[1-7]$/, { message: 'Debe ser un número entre 1 y 7' }),
    __metadata("design:type", String)
], CreateDiaDto.prototype, "nroDia", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'El focus debe ser un texto.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El focus no puede estar vacío.' }),
    __metadata("design:type", String)
], CreateDiaDto.prototype, "focus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => create_ejercicio_rutina_dto_1.CreateEjercicioRutinaDto),
    __metadata("design:type", Array)
], CreateDiaDto.prototype, "ejerciciosRutina", void 0);
//# sourceMappingURL=create-dia.dto.js.map