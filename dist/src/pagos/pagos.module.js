"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pagos_controller_1 = require("./controllers/pagos.controller");
const pago_entity_1 = require("./entity/pago.entity");
const mercadopago_service_1 = require("./services/mercadopago.service");
const pagos_service_1 = require("./services/pagos.service");
const usuario_module_1 = require("../usuario/usuario.module");
let PagosModule = class PagosModule {
};
exports.PagosModule = PagosModule;
exports.PagosModule = PagosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([pago_entity_1.PagoEntity]), usuario_module_1.UsuarioModule],
        controllers: [pagos_controller_1.PagosController],
        providers: [pagos_service_1.PagosService, mercadopago_service_1.MercadoPagoService],
        exports: [pagos_service_1.PagosService],
    })
], PagosModule);
//# sourceMappingURL=pagos.module.js.map