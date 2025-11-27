"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RutinaModule = void 0;
const common_1 = require("@nestjs/common");
const rutina_controller_1 = require("./controllers/rutina.controller");
const rutina_service_1 = require("./services/rutina.service");
const rutina_entity_1 = require("./entities/rutina.entity");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../usuario/entities/usuario.entity");
const usuario_module_1 = require("../usuario/usuario.module");
const ejercicio_basico_entity_1 = require("../ejercicio-basico/entities/ejercicio-basico.entity");
const file_img_module_1 = require("../shared/file-img/file-img.module");
let RutinaModule = class RutinaModule {
};
exports.RutinaModule = RutinaModule;
exports.RutinaModule = RutinaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([rutina_entity_1.RutinaEntity, usuario_entity_1.UsuarioEntity, ejercicio_basico_entity_1.EjercicioBasicoEntity]), usuario_module_1.UsuarioModule, file_img_module_1.FileImgModule],
        controllers: [rutina_controller_1.RutinaController],
        providers: [rutina_service_1.RutinaService],
    })
], RutinaModule);
//# sourceMappingURL=rutina.module.js.map