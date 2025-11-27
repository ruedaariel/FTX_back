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
exports.CreatePagoDto = exports.IniciarPagoDto = exports.BackUrlsDto = exports.PayerDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const pago_entity_1 = require("../entity/pago.entity");
const swagger_1 = require("@nestjs/swagger");
class PayerDto {
    name;
    surname;
    email;
    phone;
    identification_type;
    identification_number;
}
exports.PayerDto = PayerDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PayerDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PayerDto.prototype, "surname", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], PayerDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PayerDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PayerDto.prototype, "identification_type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PayerDto.prototype, "identification_number", void 0);
class BackUrlsDto {
    success;
    failure;
    pending;
}
exports.BackUrlsDto = BackUrlsDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BackUrlsDto.prototype, "success", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BackUrlsDto.prototype, "failure", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BackUrlsDto.prototype, "pending", void 0);
class IniciarPagoDto {
    usuarioId;
    monto;
    diasAdicionales;
    metodoDePago;
    descripcion;
    payer;
    back_urls;
    external_reference;
    notification_url;
    expires;
    currency_id;
    installments;
}
exports.IniciarPagoDto = IniciarPagoDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], IniciarPagoDto.prototype, "usuarioId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], IniciarPagoDto.prototype, "monto", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], IniciarPagoDto.prototype, "diasAdicionales", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(pago_entity_1.METODODEPAGO),
    __metadata("design:type", String)
], IniciarPagoDto.prototype, "metodoDePago", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IniciarPagoDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PayerDto),
    __metadata("design:type", PayerDto)
], IniciarPagoDto.prototype, "payer", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BackUrlsDto),
    __metadata("design:type", BackUrlsDto)
], IniciarPagoDto.prototype, "back_urls", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IniciarPagoDto.prototype, "external_reference", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IniciarPagoDto.prototype, "notification_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], IniciarPagoDto.prototype, "expires", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IniciarPagoDto.prototype, "currency_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], IniciarPagoDto.prototype, "installments", void 0);
class CreatePagoDto {
    fechaPago;
    estado;
    diasAdicionales;
    metodoDePago;
    monto;
    usuarioId;
    preferenciaId;
    pagoId;
    external_reference;
}
exports.CreatePagoDto = CreatePagoDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "fechaPago", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePagoDto.prototype, "diasAdicionales", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(pago_entity_1.METODODEPAGO),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "metodoDePago", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], CreatePagoDto.prototype, "monto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePagoDto.prototype, "usuarioId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "preferenciaId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "pagoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "external_reference", void 0);
//# sourceMappingURL=create-pago.dto.js.map