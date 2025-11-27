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
exports.UpdateUsuarioAdmDto = void 0;
const class_validator_1 = require("class-validator");
const estado_enum_1 = require("../../constantes/estado.enum");
const swagger_1 = require("@nestjs/swagger");
class UpdateUsuarioAdmDto {
    email;
    estado;
    idPlan;
}
exports.UpdateUsuarioAdmDto = UpdateUsuarioAdmDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'El correo no es valido' }),
    __metadata("design:type", String)
], UpdateUsuarioAdmDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(estado_enum_1.ESTADO, { message: 'estado de usuario invalido, debe ser activo,inactivo o archivado (enumerado)' }),
    __metadata("design:type", String)
], UpdateUsuarioAdmDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'El id del plan debe ser un entero' }),
    __metadata("design:type", Number)
], UpdateUsuarioAdmDto.prototype, "idPlan", void 0);
//# sourceMappingURL=update-Usuario-adm.dto.js.map