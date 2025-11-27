"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDatosPersonalesDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_datos_personales_dto_1 = require("./create-datos-personales.dto");
class UpdateDatosPersonalesDto extends (0, mapped_types_1.PartialType)(create_datos_personales_dto_1.CreateDatosPersonalesDto) {
}
exports.UpdateDatosPersonalesDto = UpdateDatosPersonalesDto;
//# sourceMappingURL=update-datos-personales.dto.js.map