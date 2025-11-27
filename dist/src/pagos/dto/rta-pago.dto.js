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
exports.RtaPagoDto = void 0;
const class_transformer_1 = require("class-transformer");
const pago_entity_1 = require("../entity/pago.entity");
const transformar_fecha_1 = require("../../utils/transformar-fecha");
const estado_enum_1 = require("../../constantes/estado.enum");
class RtaPagoDto {
    idPagos;
    fechaPago;
    fechaVencimiento;
    estado;
    diasAdicionales;
    metodoDePago;
    monto;
    usuarioId;
    createdAt;
    estadoUsuario;
    nombre;
    apellido;
}
exports.RtaPagoDto = RtaPagoDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], RtaPagoDto.prototype, "idPagos", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, transformar_fecha_1.formatToDdMmYy)(value)),
    __metadata("design:type", Object)
], RtaPagoDto.prototype, "fechaPago", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, transformar_fecha_1.formatToDdMmYy)(value)),
    __metadata("design:type", Object)
], RtaPagoDto.prototype, "fechaVencimiento", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], RtaPagoDto.prototype, "estado", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], RtaPagoDto.prototype, "diasAdicionales", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RtaPagoDto.prototype, "metodoDePago", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], RtaPagoDto.prototype, "monto", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], RtaPagoDto.prototype, "usuarioId", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], RtaPagoDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value, obj }) => value ?? obj.usuario?.estado ?? undefined, { toClassOnly: true }),
    __metadata("design:type", String)
], RtaPagoDto.prototype, "estadoUsuario", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value, obj }) => value ?? obj.usuario?.datosPersonales?.nombre ?? undefined, { toClassOnly: true }),
    __metadata("design:type", String)
], RtaPagoDto.prototype, "nombre", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value, obj }) => value ?? obj.usuario?.datosPersonales?.apellido ?? undefined, { toClassOnly: true }),
    __metadata("design:type", String)
], RtaPagoDto.prototype, "apellido", void 0);
//# sourceMappingURL=rta-pago.dto.js.map