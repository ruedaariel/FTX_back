"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rol = void 0;
const common_1 = require("@nestjs/common");
const key_decorators_1 = require("../../constantes/key-decorators");
const Rol = (...roles) => (0, common_1.SetMetadata)(key_decorators_1.ROL_KEY, roles);
exports.Rol = Rol;
//# sourceMappingURL=roles.decorator.js.map