"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorManager = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const typeorm_1 = require("typeorm");
class ErrorManager extends Error {
    type;
    customMessage;
    constructor(type, customMessage) {
        super(`${type} :: ${customMessage}`);
        this.type = type;
        this.customMessage = customMessage;
    }
    static handle(error) {
        if (error instanceof ErrorManager) {
            throw new common_1.HttpException(error.customMessage, common_1.HttpStatus[error.type]);
        }
        if (error instanceof multer_1.MulterError) {
            switch (error.code) {
                case 'LIMIT_FILE_SIZE':
                    throw new ErrorManager('BAD_REQUEST', 'El archivo excede el tamaño máximo permitido');
                case 'LIMIT_UNEXPECTED_FILE':
                    throw new ErrorManager('BAD_REQUEST', 'Archivo inesperado');
                default:
                    throw new ErrorManager('BAD_REQUEST', `Error al subir archivo: ${error.message}`);
            }
        }
        if (error instanceof typeorm_1.QueryFailedError) {
            const code = error.code;
            switch (code) {
                case 'ER_DUP_ENTRY':
                    throw new common_1.HttpException('Ya existe un registro con ese valor unico', common_1.HttpStatus.BAD_REQUEST);
                case 'ER_BAD_DB_ERROR':
                    throw new common_1.HttpException('La base de datos no existe', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                case 'ER_PARSE_ERROR':
                    throw new common_1.HttpException('Error de sintaxis en la consulta SQL', common_1.HttpStatus.BAD_REQUEST);
                case 'ER_NO_SUCH_TABLE':
                    throw new common_1.HttpException('La tabla especificada no existe', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                case 'ER_ACCESS_DENIED_ERROR':
                    throw new common_1.HttpException('Acceso denegado: usuario o contraseña incorrectos', common_1.HttpStatus.UNAUTHORIZED);
                case 'ER_LOCK_WAIT_TIMEOUT':
                    throw new common_1.HttpException('Tiempo de espera agotado al intentar obtener un bloqueo', common_1.HttpStatus.REQUEST_TIMEOUT);
                case 'ER_DATA_TOO_LONG':
                    throw new common_1.HttpException('El dato excede el tamaño permitido para la columna', common_1.HttpStatus.BAD_REQUEST);
                case 'ER_NO_REFERENCED_ROW_2':
                case 'ER_ROW_IS_REFERENCED_2':
                    throw new common_1.HttpException('Referencia inválida: clave foránea no encontrada', common_1.HttpStatus.BAD_REQUEST);
                default:
                    throw new common_1.HttpException(`Error de base de datos: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        throw new common_1.HttpException('Error interno del servidor', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.ErrorManager = ErrorManager;
//# sourceMappingURL=error.manager.js.map