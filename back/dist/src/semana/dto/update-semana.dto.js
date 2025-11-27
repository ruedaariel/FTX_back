"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSemanaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_semana_dto_1 = require("./create-semana.dto");
class UpdateSemanaDto extends (0, mapped_types_1.PartialType)(create_semana_dto_1.CreateSemanaDto) {
}
exports.UpdateSemanaDto = UpdateSemanaDto;
//# sourceMappingURL=update-semana.dto.js.map