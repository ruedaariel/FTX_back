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
exports.RtaAllRutinasDto = void 0;
const class_transformer_1 = require("class-transformer");
const rutina_entity_1 = require("../entities/rutina.entity");
class RtaAllRutinasDto {
    idRutina;
    nombreRutina;
    estadoRutina;
    idUsuario;
    nombreUsuario;
}
exports.RtaAllRutinasDto = RtaAllRutinasDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], RtaAllRutinasDto.prototype, "idRutina", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RtaAllRutinasDto.prototype, "nombreRutina", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RtaAllRutinasDto.prototype, "estadoRutina", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], RtaAllRutinasDto.prototype, "idUsuario", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RtaAllRutinasDto.prototype, "nombreUsuario", void 0);
//# sourceMappingURL=rta-all-rutinas.dto.js.map