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
exports.UsuarioEntity = void 0;
const estado_enum_1 = require("../../constantes/estado.enum");
const pago_entity_1 = require("../../pagos/entity/pago.entity");
const rutina_entity_1 = require("../../rutina/entities/rutina.entity");
const datos_fisicos_entity_1 = require("../../usuario-datos-fisicos/entities/datos-fisicos.entity");
const datos_personales_entity_1 = require("../../usuario-datos-personales/entities/datos-personales.entity");
const typeorm_1 = require("typeorm");
const rol_1 = require("../../constantes/rol");
let UsuarioEntity = class UsuarioEntity {
    id;
    email;
    password;
    rol;
    estado;
    passwordChangedAt;
    level;
    fBaja;
    fCreacion;
    fUltimoAcceso;
    datosPersonales;
    datosFisicos;
    rutinas;
    pagos;
};
exports.UsuarioEntity = UsuarioEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UsuarioEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true, length: 255 }),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 128 }),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: rol_1.ROL, default: rol_1.ROL.USUARIO }),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: estado_enum_1.ESTADO, default: estado_enum_1.ESTADO.ACTIVO }),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', name: 'password_changed_at', nullable: true, default: null }),
    __metadata("design:type", Object)
], UsuarioEntity.prototype, "passwordChangedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', default: 0 }),
    __metadata("design:type", Number)
], UsuarioEntity.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', name: 'f_baja', nullable: true }),
    __metadata("design:type", Object)
], UsuarioEntity.prototype, "fBaja", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        name: 'f_creacion'
    }),
    __metadata("design:type", Date)
], UsuarioEntity.prototype, "fCreacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', name: 'f_ultimo_acceso' }),
    __metadata("design:type", Date)
], UsuarioEntity.prototype, "fUltimoAcceso", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => datos_personales_entity_1.DatosPersonalesEntity, { nullable: true, cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", datos_personales_entity_1.DatosPersonalesEntity)
], UsuarioEntity.prototype, "datosPersonales", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => datos_fisicos_entity_1.DatosFisicosEntity, { nullable: true, cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", datos_fisicos_entity_1.DatosFisicosEntity)
], UsuarioEntity.prototype, "datosFisicos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rutina_entity_1.RutinaEntity, rutina => rutina.usuario),
    __metadata("design:type", Array)
], UsuarioEntity.prototype, "rutinas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pago_entity_1.PagoEntity, (pago) => pago.usuario),
    __metadata("design:type", Array)
], UsuarioEntity.prototype, "pagos", void 0);
exports.UsuarioEntity = UsuarioEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'usuario' })
], UsuarioEntity);
//# sourceMappingURL=usuario.entity.js.map