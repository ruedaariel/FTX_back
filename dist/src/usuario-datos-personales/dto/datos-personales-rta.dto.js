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
exports.DatosPersonalesRtaDto = void 0;
const datos_personales_entity_1 = require("../entities/datos-personales.entity");
const class_transformer_1 = require("class-transformer");
const estado_enum_1 = require("../../constantes/estado.enum");
const plan_rta_dto_1 = require("../../plan/dto/plan-rta.dto");
const transformar_fecha_1 = require("../../utils/transformar-fecha");
class DatosPersonalesRtaDto {
    id;
    nombre;
    apellido;
    dni;
    phone;
    genero;
    plan;
    fNacimiento;
    imagenPerfil;
    estado;
}
exports.DatosPersonalesRtaDto = DatosPersonalesRtaDto;
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], DatosPersonalesRtaDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DatosPersonalesRtaDto.prototype, "nombre", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DatosPersonalesRtaDto.prototype, "apellido", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DatosPersonalesRtaDto.prototype, "dni", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DatosPersonalesRtaDto.prototype, "phone", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DatosPersonalesRtaDto.prototype, "genero", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => plan_rta_dto_1.PlanRtaDto),
    __metadata("design:type", plan_rta_dto_1.PlanRtaDto)
], DatosPersonalesRtaDto.prototype, "plan", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, transformar_fecha_1.transforma_a_DDMMYY)(value)),
    __metadata("design:type", String)
], DatosPersonalesRtaDto.prototype, "fNacimiento", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        const baseUrl = `${process.env.BACKEND_URL}/uploads/perfiles/`;
        if (!value)
            return "";
        if (value.startsWith(baseUrl))
            return value;
        return baseUrl + value;
    }),
    __metadata("design:type", String)
], DatosPersonalesRtaDto.prototype, "imagenPerfil", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], DatosPersonalesRtaDto.prototype, "estado", void 0);
//# sourceMappingURL=datos-personales-rta.dto.js.map