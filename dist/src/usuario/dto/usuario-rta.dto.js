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
exports.UsuarioRtaDto = void 0;
const class_transformer_1 = require("class-transformer");
const datos_personales_rta_dto_1 = require("../../usuario-datos-personales/dto/datos-personales-rta.dto");
const datos_fisicos_rta_dto_1 = require("../../usuario-datos-fisicos/dto/datos-fisicos-rta.dto");
const estado_enum_1 = require("../../constantes/estado.enum");
const rol_1 = require("../../constantes/rol");
class UsuarioRtaDto {
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
    datosPersonales;
    datosFisicos;
    message = '';
}
exports.UsuarioRtaDto = UsuarioRtaDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UsuarioRtaDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UsuarioRtaDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UsuarioRtaDto.prototype, "rol", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UsuarioRtaDto.prototype, "estado", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], UsuarioRtaDto.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], UsuarioRtaDto.prototype, "level", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], UsuarioRtaDto.prototype, "passwordChangedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], UsuarioRtaDto.prototype, "fBaja", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], UsuarioRtaDto.prototype, "fCreacion", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], UsuarioRtaDto.prototype, "fUltimoAcceso", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => datos_personales_rta_dto_1.DatosPersonalesRtaDto),
    __metadata("design:type", datos_personales_rta_dto_1.DatosPersonalesRtaDto)
], UsuarioRtaDto.prototype, "datosPersonales", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => datos_fisicos_rta_dto_1.DatosFisicosRtaDto),
    __metadata("design:type", datos_fisicos_rta_dto_1.DatosFisicosRtaDto)
], UsuarioRtaDto.prototype, "datosFisicos", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UsuarioRtaDto.prototype, "message", void 0);
//# sourceMappingURL=usuario-rta.dto.js.map