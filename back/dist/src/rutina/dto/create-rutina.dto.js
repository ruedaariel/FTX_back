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
exports.CreateRutinaDto = void 0;
const class_validator_1 = require("class-validator");
const rutina_entity_1 = require("../entities/rutina.entity");
const class_transformer_1 = require("class-transformer");
const create_semana_dto_1 = require("../../semana/dto/create-semana.dto");
const swagger_1 = require("@nestjs/swagger");
class CreateRutinaDto {
    nombreRutina;
    estadoRutina;
    idUsuario;
    semanas;
}
exports.CreateRutinaDto = CreateRutinaDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre no puede estar vacío' }),
    (0, class_validator_1.Matches)(/^.{3,}$/, { message: 'El nombre debe tener al menos 2 caracteres' }),
    __metadata("design:type", String)
], CreateRutinaDto.prototype, "nombreRutina", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(rutina_entity_1.ESTADORUTINA, { message: "Debe tener algun estado valido" }),
    __metadata("design:type", String)
], CreateRutinaDto.prototype, "estadoRutina", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'El idUsuario debe ser un número entero' }),
    (0, class_validator_1.Min)(0, { message: 'el id debe ser un numero positivo' }),
    __metadata("design:type", Object)
], CreateRutinaDto.prototype, "idUsuario", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => create_semana_dto_1.CreateSemanaDto),
    __metadata("design:type", Array)
], CreateRutinaDto.prototype, "semanas", void 0);
//# sourceMappingURL=create-rutina.dto.js.map