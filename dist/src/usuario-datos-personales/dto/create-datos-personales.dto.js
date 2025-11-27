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
exports.CreateDatosPersonalesDto = void 0;
const class_validator_1 = require("class-validator");
const datos_personales_entity_1 = require("../entities/datos-personales.entity");
const swagger_1 = require("@nestjs/swagger");
class CreateDatosPersonalesDto {
    nombre;
    apellido;
    dni;
    phone;
    genero;
    idPlan;
    fNacimiento;
    imagenPerfil;
}
exports.CreateDatosPersonalesDto = CreateDatosPersonalesDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre no puede estar vacío' }),
    (0, class_validator_1.Matches)(/^.{2,}$/, { message: 'El nombre debe tener al menos 2 caracteres' }),
    __metadata("design:type", String)
], CreateDatosPersonalesDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El apellido no puede estar vacío' }),
    (0, class_validator_1.Matches)(/^.{2,}$/, { message: 'El apellido debe tener al menos 2 caracteres' }),
    __metadata("design:type", String)
], CreateDatosPersonalesDto.prototype, "apellido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El DNI no puede estar vacío' }),
    (0, class_validator_1.Matches)(/^\d{7,8}$/, { message: 'El DNI debe tener 7 u 8 dígitos numéricos' }),
    __metadata("design:type", String)
], CreateDatosPersonalesDto.prototype, "dni", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El teléfono no puede estar vacío' }),
    (0, class_validator_1.Matches)(/^\d{10}$/, { message: 'El teléfono debe tener exactamente 10 dígitos' }),
    __metadata("design:type", String)
], CreateDatosPersonalesDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(datos_personales_entity_1.GENERO, { message: 'El género debe ser "hombre", "mujer" o "otro"' }),
    __metadata("design:type", String)
], CreateDatosPersonalesDto.prototype, "genero", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1, { message: 'El id del plan debe ser mayor a 0' }),
    __metadata("design:type", Number)
], CreateDatosPersonalesDto.prototype, "idPlan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La fecha de nacimiento no debe ser vacia' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateDatosPersonalesDto.prototype, "fNacimiento", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDatosPersonalesDto.prototype, "imagenPerfil", void 0);
//# sourceMappingURL=create-datos-personales.dto.js.map