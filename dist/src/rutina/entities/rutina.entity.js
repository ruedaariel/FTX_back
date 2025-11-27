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
exports.RutinaEntity = exports.ESTADORUTINA = void 0;
const semana_entity_1 = require("../../semana/entities/semana.entity");
const usuario_entity_1 = require("../../usuario/entities/usuario.entity");
const typeorm_1 = require("typeorm");
var ESTADORUTINA;
(function (ESTADORUTINA) {
    ESTADORUTINA["ACTIVA"] = "activa";
    ESTADORUTINA["FINALIZADA"] = "finalizada";
    ESTADORUTINA["PROXIMARUTINA"] = "proxima";
    ESTADORUTINA["ENPROCESO"] = "en proceso";
    ESTADORUTINA["COMPLETA"] = "completa";
})(ESTADORUTINA || (exports.ESTADORUTINA = ESTADORUTINA = {}));
let RutinaEntity = class RutinaEntity {
    idRutina;
    nombreRutina;
    estadoRutina;
    fCreacionRutina;
    fUltimoAccesoRutina;
    fBajaRutina;
    usuario;
    semanas;
};
exports.RutinaEntity = RutinaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RutinaEntity.prototype, "idRutina", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true, length: 100 }),
    __metadata("design:type", String)
], RutinaEntity.prototype, "nombreRutina", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ESTADORUTINA }),
    __metadata("design:type", String)
], RutinaEntity.prototype, "estadoRutina", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        name: 'f_creacion'
    }),
    __metadata("design:type", Date)
], RutinaEntity.prototype, "fCreacionRutina", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', name: 'f_ultimo_acceso' }),
    __metadata("design:type", Date)
], RutinaEntity.prototype, "fUltimoAccesoRutina", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', name: 'f_baja', nullable: true }),
    __metadata("design:type", Object)
], RutinaEntity.prototype, "fBajaRutina", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.UsuarioEntity, usuario => usuario.rutinas, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'id_usuario' }),
    __metadata("design:type", Object)
], RutinaEntity.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => semana_entity_1.SemanaEntity, semana => semana.rutina, { cascade: true }),
    __metadata("design:type", Array)
], RutinaEntity.prototype, "semanas", void 0);
exports.RutinaEntity = RutinaEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'rutina' })
], RutinaEntity);
//# sourceMappingURL=rutina.entity.js.map