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
exports.PagoEntity = exports.METODODEPAGO = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("../../usuario/entities/usuario.entity");
var METODODEPAGO;
(function (METODODEPAGO) {
    METODODEPAGO["TARJETA"] = "tarjeta";
    METODODEPAGO["MERCADOPAGO"] = "mercadopago";
    METODODEPAGO["TRANSFERENCIA"] = "transferencia";
    METODODEPAGO["EFECTIVO"] = "efectivo";
})(METODODEPAGO || (exports.METODODEPAGO = METODODEPAGO = {}));
let PagoEntity = class PagoEntity {
    idPagos;
    fechaPago;
    fechaVencimiento;
    estado;
    diasAdicionales;
    metodoDePago;
    monto;
    referencia;
    usuarioId;
    usuario;
    createdAt;
};
exports.PagoEntity = PagoEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PagoEntity.prototype, "idPagos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], PagoEntity.prototype, "fechaPago", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], PagoEntity.prototype, "fechaVencimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 32 }),
    __metadata("design:type", String)
], PagoEntity.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PagoEntity.prototype, "diasAdicionales", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: METODODEPAGO }),
    __metadata("design:type", String)
], PagoEntity.prototype, "metodoDePago", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], PagoEntity.prototype, "monto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], PagoEntity.prototype, "referencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'usuarioId' }),
    __metadata("design:type", Number)
], PagoEntity.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.UsuarioEntity, (usuario) => usuario.pagos, {
        nullable: false,
        onUpdate: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'usuarioId' }),
    __metadata("design:type", usuario_entity_1.UsuarioEntity)
], PagoEntity.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', name: 'created_at' }),
    __metadata("design:type", Date)
], PagoEntity.prototype, "createdAt", void 0);
exports.PagoEntity = PagoEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'pago' }),
    (0, typeorm_1.Index)('idx_pagos_usuario_fecha', ['usuarioId', 'fechaPago'])
], PagoEntity);
//# sourceMappingURL=pago.entity.js.map