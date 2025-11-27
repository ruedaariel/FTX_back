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
exports.DatosPersonalesEntity = exports.GENERO = void 0;
const estado_enum_1 = require("../../constantes/estado.enum");
const plan_entity_1 = require("../../plan/entities/plan.entity");
const typeorm_1 = require("typeorm");
var GENERO;
(function (GENERO) {
    GENERO["HOMBRE"] = "hombre";
    GENERO["MUJER"] = "mujer";
    GENERO["OTRO"] = "otro";
})(GENERO || (exports.GENERO = GENERO = {}));
let DatosPersonalesEntity = class DatosPersonalesEntity {
    id;
    nombre;
    apellido;
    dni;
    phone;
    genero;
    fNacimiento;
    imagenPerfil;
    estado;
    plan;
    constructor() {
        this.imagenPerfil = 'usuario.png';
    }
};
exports.DatosPersonalesEntity = DatosPersonalesEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], DatosPersonalesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false, }),
    __metadata("design:type", String)
], DatosPersonalesEntity.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false, }),
    __metadata("design:type", String)
], DatosPersonalesEntity.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 8, nullable: false, }),
    __metadata("design:type", String)
], DatosPersonalesEntity.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, }),
    __metadata("design:type", String)
], DatosPersonalesEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: GENERO, nullable: false, }),
    __metadata("design:type", String)
], DatosPersonalesEntity.prototype, "genero", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], DatosPersonalesEntity.prototype, "fNacimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, default: 'usuario.png', }),
    __metadata("design:type", String)
], DatosPersonalesEntity.prototype, "imagenPerfil", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: estado_enum_1.ESTADO, default: estado_enum_1.ESTADO.ACTIVO }),
    __metadata("design:type", String)
], DatosPersonalesEntity.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plan_entity_1.PlanEntity, plan => plan.datosPersonales, {
        nullable: true,
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], DatosPersonalesEntity.prototype, "plan", void 0);
exports.DatosPersonalesEntity = DatosPersonalesEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'datospersonales' }),
    __metadata("design:paramtypes", [])
], DatosPersonalesEntity);
//# sourceMappingURL=datos-personales.entity.js.map