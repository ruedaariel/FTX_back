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
exports.UpdateUsuarioBasicoDto = void 0;
const class_validator_1 = require("class-validator");
const rol_1 = require("../../constantes/rol");
const swagger_1 = require("@nestjs/swagger");
class UpdateUsuarioBasicoDto {
    email;
    password;
    rol;
}
exports.UpdateUsuarioBasicoDto = UpdateUsuarioBasicoDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)({ message: 'El correo no puede ser vacio' }),
    (0, class_validator_1.IsEmail)({}, { message: 'El correo no es valido' }),
    __metadata("design:type", String)
], UpdateUsuarioBasicoDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)({ message: 'la contraseña no puede ser vacia' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: 'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número',
    }),
    __metadata("design:type", String)
], UpdateUsuarioBasicoDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)({ message: 'El rol no puede ser vacio' }),
    (0, class_validator_1.IsEnum)(rol_1.ROL, { message: 'tipo de usuario invalido, debe ser usuario o admin (enumerado)' }),
    __metadata("design:type", String)
], UpdateUsuarioBasicoDto.prototype, "rol", void 0);
//# sourceMappingURL=update-usuarioBasico.dto.js.map