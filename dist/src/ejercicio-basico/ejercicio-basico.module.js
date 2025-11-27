"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EjercicioBasicoModule = void 0;
const common_1 = require("@nestjs/common");
const ejercicio_basico_controller_1 = require("./controllers/ejercicio-basico.controller");
const ejercicio_basico_service_1 = require("./services/ejercicio-basico.service");
const ejercicio_basico_entity_1 = require("./entities/ejercicio-basico.entity");
const typeorm_1 = require("@nestjs/typeorm");
const file_img_module_1 = require("../shared/file-img/file-img.module");
let EjercicioBasicoModule = class EjercicioBasicoModule {
};
exports.EjercicioBasicoModule = EjercicioBasicoModule;
exports.EjercicioBasicoModule = EjercicioBasicoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([ejercicio_basico_entity_1.EjercicioBasicoEntity]), file_img_module_1.FileImgModule],
        controllers: [ejercicio_basico_controller_1.EjercicioBasicoController],
        providers: [ejercicio_basico_service_1.EjercicioBasicoService],
    })
], EjercicioBasicoModule);
//# sourceMappingURL=ejercicio-basico.module.js.map