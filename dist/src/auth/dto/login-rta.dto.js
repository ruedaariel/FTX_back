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
exports.LoginRtaDto = void 0;
const estado_enum_1 = require("../../constantes/estado.enum");
const class_transformer_1 = require("class-transformer");
const rol_1 = require("../../constantes/rol");
class LoginRtaDto {
    id;
    email;
    rol;
    estado;
    password;
    level;
    passwordChangedAt;
    fBaja;
    fCreacion;
    fUltimoAcceso;
    token;
    message;
}
exports.LoginRtaDto = LoginRtaDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], LoginRtaDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginRtaDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginRtaDto.prototype, "rol", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginRtaDto.prototype, "estado", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], LoginRtaDto.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], LoginRtaDto.prototype, "level", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], LoginRtaDto.prototype, "passwordChangedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], LoginRtaDto.prototype, "fBaja", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], LoginRtaDto.prototype, "fCreacion", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], LoginRtaDto.prototype, "fUltimoAcceso", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginRtaDto.prototype, "token", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginRtaDto.prototype, "message", void 0);
//# sourceMappingURL=login-rta.dto.js.map