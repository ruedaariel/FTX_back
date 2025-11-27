"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModule = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("./services/usuario.service");
const usuario_controller_1 = require("./controllers/usuario.controller");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("./entities/usuario.entity");
const datos_personales_entity_1 = require("../usuario-datos-personales/entities/datos-personales.entity");
const datos_fisicos_entity_1 = require("../usuario-datos-fisicos/entities/datos-fisicos.entity");
const usuario_datos_fisicos_module_1 = require("../usuario-datos-fisicos/usuario-datos-fisicos.module");
const datos_personales_module_1 = require("../usuario-datos-personales/datos-personales.module");
const plan_entity_1 = require("../plan/entities/plan.entity");
const plan_module_1 = require("../plan/plan.module");
const rutina_entity_1 = require("../rutina/entities/rutina.entity");
const email_module_1 = require("../shared/email/email.module");
const file_img_module_1 = require("../shared/file-img/file-img.module");
let UsuarioModule = class UsuarioModule {
};
exports.UsuarioModule = UsuarioModule;
exports.UsuarioModule = UsuarioModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([usuario_entity_1.UsuarioEntity, datos_personales_entity_1.DatosPersonalesEntity, datos_fisicos_entity_1.DatosFisicosEntity, plan_entity_1.PlanEntity, rutina_entity_1.RutinaEntity]), usuario_datos_fisicos_module_1.DatosFisicosModule, datos_personales_module_1.DatosPersonalesModule, plan_module_1.PlanModule, email_module_1.EmailModule, file_img_module_1.FileImgModule],
        controllers: [usuario_controller_1.UsuarioController],
        providers: [usuario_service_1.UsuarioService],
        exports: [usuario_service_1.UsuarioService, typeorm_1.TypeOrmModule]
    })
], UsuarioModule);
//# sourceMappingURL=usuario.module.js.map