import { HttpException, HttpStatus } from "@nestjs/common";
import { QueryFailedError } from "typeorm";
//video 
export class ErrorManager extends Error { //creo una clase  para manejo de errores que extiende de la clase Error de Node
  constructor(public readonly type: keyof typeof HttpStatus, public readonly customMessage: string) {
    super(`${type} :: ${customMessage}`);



  }
  
  static handle(error: unknown): never {
    if (error instanceof ErrorManager) {
      throw new HttpException(error.customMessage, HttpStatus[error.type]);
    }
    //sugerencia de la IA
    // Errores de base de datos
    if (error instanceof QueryFailedError) {
      const message = (error as any).message;

      //  Error de duplicado (ej. email único)
      if (message.includes('Duplicate entry')) {
        if (message.includes('email')) {
          throw new HttpException('El email ya está registrado', HttpStatus.BAD_REQUEST);
        }
        throw new HttpException('Ya existe un registro con ese valor único', HttpStatus.BAD_REQUEST);
      }

      //  Error de clave foránea
      if (message.includes('a foreign key constraint fails')) {
        throw new HttpException('Referencia inválida: clave foránea no encontrada', HttpStatus.BAD_REQUEST);
      }

      //  Error por campo nulo
      if (message.includes('cannot be null')) {
        throw new HttpException('Faltan campos obligatorios', HttpStatus.BAD_REQUEST);
      }

      //  Otros errores de SQL
      throw new HttpException(`Error de base de datos: ${message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Errores inesperados
    throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
