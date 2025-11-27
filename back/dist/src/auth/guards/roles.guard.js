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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const key_decorators_1 = require("../../constantes/key-decorators");
const rol_1 = require("../../constantes/rol");
let RolesGuard = class RolesGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.get(key_decorators_1.PUBLIC_KEY, context.getHandler());
        if (isPublic) {
            return true;
        }
        const roles = this.reflector.get(key_decorators_1.ROL_KEY, context.getHandler());
        const admin = this.reflector.get(key_decorators_1.ADMIN_KEY, context.getHandler());
        const req = context.switchToHttp().getRequest();
        const { rolUser } = req;
        if (roles === undefined) {
            if (!admin) {
                return true;
            }
            else if (admin && rolUser.toUpperCase() === 'ADMIN') {
                return true;
            }
            else {
                throw new common_1.UnauthorizedException('No tienes permisos para acceder a este servicio');
            }
        }
        if (rolUser.toUpperCase() === rol_1.ROL.ADMIN || rolUser === rol_1.ROL.ADMIN) {
            return true;
        }
        const isAuth = roles.some(rol => rol === rolUser.toUpperCase() || rol === rolUser);
        if (!isAuth) {
            throw new common_1.UnauthorizedException('No tienes permisos para acceder a esta operación');
        }
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map