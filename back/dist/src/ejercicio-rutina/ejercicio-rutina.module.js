"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EjercicioRutinaModule = void 0;
const common_1 = require("@nestjs/common");
const ejercicio_rutina_service_1 = require("./services/ejercicio-rutina.service");
const ejercicio_rutina_controller_1 = require("./controllers/ejercicio-rutina.controller");
const ejercicio_rutina_entity_1 = require("./entities/ejercicio-rutina.entity");
const typeorm_1 = require("@nestjs/typeorm");
let EjercicioRutinaModule = class EjercicioRutinaModule {
};
exports.EjercicioRutinaModule = EjercicioRutinaModule;
exports.EjercicioRutinaModule = EjercicioRutinaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([ejercicio_rutina_entity_1.EjercicioRutinaEntity]),],
        controllers: [ejercicio_rutina_controller_1.EjercicioRutinaController],
        providers: [ejercicio_rutina_service_1.EjercicioRutinaService],
    })
], EjercicioRutinaModule);
//# sourceMappingURL=ejercicio-rutina.module.js.map