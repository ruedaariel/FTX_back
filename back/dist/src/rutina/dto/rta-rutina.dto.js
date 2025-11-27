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
exports.RtaRutinaDto = void 0;
const class_transformer_1 = require("class-transformer");
const rutina_entity_1 = require("../entities/rutina.entity");
const rta_semana_dto_1 = require("../../semana/dto/rta-semana.dto");
class RtaRutinaDto {
    idRutina;
    nombreRutina;
    estadoRutina;
    fCreacionRutina;
    fUltimoAccesoRutina;
    fBajaRutina;
    idUsuario;
    semanas;
}
exports.RtaRutinaDto = RtaRutinaDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], RtaRutinaDto.prototype, "idRutina", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RtaRutinaDto.prototype, "nombreRutina", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RtaRutinaDto.prototype, "estadoRutina", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], RtaRutinaDto.prototype, "fCreacionRutina", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], RtaRutinaDto.prototype, "fUltimoAccesoRutina", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], RtaRutinaDto.prototype, "fBajaRutina", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ obj, value }) => {
        if (typeof value === 'number')
            return value;
        const usuarioIdFromObj = obj?.usuario?.id;
        if (typeof usuarioIdFromObj === 'number')
            return usuarioIdFromObj;
        if (typeof obj?.idUsuario === 'number')
            return obj.idUsuario;
        return null;
    }),
    __metadata("design:type", Object)
], RtaRutinaDto.prototype, "idUsuario", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => rta_semana_dto_1.RtaSemanaDto),
    __metadata("design:type", Array)
], RtaRutinaDto.prototype, "semanas", void 0);
//# sourceMappingURL=rta-rutina.dto.js.map