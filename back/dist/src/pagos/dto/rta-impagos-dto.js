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
exports.RtaImpagosDto = void 0;
const class_transformer_1 = require("class-transformer");
const transformar_fecha_1 = require("../../utils/transformar-fecha");
const estado_enum_1 = require("../../constantes/estado.enum");
class RtaImpagosDto {
    idPagos;
    fechaPago;
    fechaVencimiento;
    metodoDePago;
    monto;
    usuarioId;
    estadoUsuario;
    nombre;
    apellido;
}
exports.RtaImpagosDto = RtaImpagosDto;
__decorate([
    (0, class_transformer_1.Expose)({ name: 'pagoId' }),
    __metadata("design:type", Number)
], RtaImpagosDto.prototype, "idPagos", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value ? (0, transformar_fecha_1.formatToDdMmYy)(value) : null),
    __metadata("design:type", Object)
], RtaImpagosDto.prototype, "fechaPago", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value ? (0, transformar_fecha_1.formatToDdMmYy)(value) : null),
    __metadata("design:type", Object)
], RtaImpagosDto.prototype, "fechaVencimiento", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], RtaImpagosDto.prototype, "metodoDePago", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], RtaImpagosDto.prototype, "monto", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], RtaImpagosDto.prototype, "usuarioId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RtaImpagosDto.prototype, "estadoUsuario", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RtaImpagosDto.prototype, "nombre", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RtaImpagosDto.prototype, "apellido", void 0);
//# sourceMappingURL=rta-impagos-dto.js.map