"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDiaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_dia_dto_1 = require("./create-dia.dto");
class UpdateDiaDto extends (0, mapped_types_1.PartialType)(create_dia_dto_1.CreateDiaDto) {
}
exports.UpdateDiaDto = UpdateDiaDto;
//# sourceMappingURL=update-dia.dto.js.map