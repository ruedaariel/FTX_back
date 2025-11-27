"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRutinaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_rutina_dto_1 = require("./create-rutina.dto");
class UpdateRutinaDto extends (0, mapped_types_1.PartialType)(create_rutina_dto_1.CreateRutinaDto) {
}
exports.UpdateRutinaDto = UpdateRutinaDto;
//# sourceMappingURL=update-rutina.dto.js.map