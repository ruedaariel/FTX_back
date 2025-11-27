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
exports.CreateEjercicioBasicoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateEjercicioBasicoDto {
    nombreEjercicio;
    observaciones;
    imagenLink;
    videoLink;
}
exports.CreateEjercicioBasicoDto = CreateEjercicioBasicoDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser un texto' }),
    (0, class_validator_1.Matches)(/^[\p{L}\p{N} ,()/%°\-\[\]]{2,60}$/u, {
        message: 'Debe tener entre 2 y 60 caracteres y solo caracteres válidos',
    }),
    (0, class_validator_1.Length)(3, 60, {
        message: 'Debe tener al menos 3 caracteres y max 60',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value.trim().replace(/\s+/g, ' ')),
    __metadata("design:type", String)
], CreateEjercicioBasicoDto.prototype, "nombreEjercicio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEjercicioBasicoDto.prototype, "observaciones", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^(\.\/|\/)?[\w\-\/]+\.(jpg|png|webp)$/, {
        message: 'Debe ser una ruta válida con extensión .jpg, .png o .webp',
    }),
    __metadata("design:type", Object)
], CreateEjercicioBasicoDto.prototype, "imagenLink", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'videoLink debe ser una URL válida' }),
    __metadata("design:type", Object)
], CreateEjercicioBasicoDto.prototype, "videoLink", void 0);
//# sourceMappingURL=create-ejercicio-basico.dto.js.map