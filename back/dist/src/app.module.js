"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("./modulo-database/database.module");
const usuario_module_1 = require("./usuario/usuario.module");
const datos_personales_module_1 = require("./usuario-datos-personales/datos-personales.module");
const usuario_datos_fisicos_module_1 = require("./usuario-datos-fisicos/usuario-datos-fisicos.module");
const ejercicio_basico_module_1 = require("./ejercicio-basico/ejercicio-basico.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
const rutina_module_1 = require("./rutina/rutina.module");
const semana_module_1 = require("./semana/semana.module");
const dia_module_1 = require("./dia/dia.module");
const ejercicio_rutina_module_1 = require("./ejercicio-rutina/ejercicio-rutina.module");
const plan_module_1 = require("./plan/plan.module");
const email_module_1 = require("./shared/email/email.module");
const pagos_module_1 = require("./pagos/pagos.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.MODE_ENV || 'develop'}.env`,
                isGlobal: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            database_module_1.DatabaseModule,
            usuario_module_1.UsuarioModule,
            datos_personales_module_1.DatosPersonalesModule,
            usuario_datos_fisicos_module_1.DatosFisicosModule,
            ejercicio_basico_module_1.EjercicioBasicoModule,
            rutina_module_1.RutinaModule,
            semana_module_1.SemanaModule,
            dia_module_1.DiaModule,
            ejercicio_rutina_module_1.EjercicioRutinaModule,
            plan_module_1.PlanModule,
            email_module_1.EmailModule,
            pagos_module_1.PagosModule,
            auth_module_1.AuthModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map