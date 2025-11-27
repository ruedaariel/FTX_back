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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessLevelGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const key_decorators_1 = require("../../constantes/key-decorators");
const rol_1 = require("../../constantes/rol");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../../usuario/entities/usuario.entity");
const typeorm_2 = require("typeorm");
let AccessLevelGuard = class AccessLevelGuard {
    reflector;
    usuarioRepository;
    constructor(reflector, usuarioRepository) {
        this.reflector = reflector;
        this.usuarioRepository = usuarioRepository;
    }
    async canActivate(context) {
        const isPublic = this.reflector.get(key_decorators_1.PUBLIC_KEY, context.getHandler());
        if (isPublic) {
            return true;
        }
        const roles = this.reflector.get(key_decorators_1.ROL_KEY, context.getHandler());
        const admin = this.reflector.get(key_decorators_1.ADMIN_KEY, context.getHandler());
        const accessLevel = this.reflector.get(key_decorators_1.ACCESS_LEVEL_KEY, context.getHandler());
        const req = context.switchToHttp().getRequest();
        const { rolUser } = req;
        if (accessLevel === undefined) {
            if (roles === undefined) {
                if (!admin) {
                    return true;
                }
                else if (admin && rolUser.toUpperCase() === 'ADMIN') {
                    return true;
                }
                else {
                    throw new common_1.UnauthorizedException('No tienes permisos para este servicio');
                }
            }
        }
        if (rolUser.toUpperCase() === rol_1.ROL.ADMIN) {
            return true;
        }
        const { idUser } = req;
        const unUsuario = await this.usuarioRepository.findOneBy({ id: +idUser });
        if (!unUsuario) {
            throw new common_1.UnauthorizedException('No tienes permisos para este servicio');
        }
        if (accessLevel > unUsuario.level) {
            throw new common_1.UnauthorizedException('No podés acceder con tu plan actual. \n Actualizá tu PLAN para desbloquear este servicio.');
        }
        return true;
    }
};
exports.AccessLevelGuard = AccessLevelGuard;
exports.AccessLevelGuard = AccessLevelGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(usuario_entity_1.UsuarioEntity)),
    __metadata("design:paramtypes", [core_1.Reflector,
        typeorm_2.Repository])
], AccessLevelGuard);
//# sourceMappingURL=access-level.guard.js.map