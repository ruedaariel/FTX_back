import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioBasicoDto } from './create-usuarioBasico.dto';
import { IsEmail, IsEnum, IsInt, IsOptional, Matches } from 'class-validator';
import { ROL } from '../entities/usuario.entity';
import { ESTADO } from '../../constantes/estado.enum';

export class UpdateUsuarioAdmDto  {
    //no se pudo usar el PartialType, porque enel Creat no esta el password
        @IsOptional()
        @IsEmail({}, { message: 'El correo no es valido' })
        email?: string;

        @IsOptional()
        @IsEnum(ESTADO,{ message: 'estado de usuario invalido, debe ser activo,inactivo o archivado (enumerado)' })
        estado?:ESTADO;

        @IsOptional()
        @IsInt({ message: 'El id del plan debe ser un entero' })
        idPlan?:number;
}
//con el PartialType, ya me lo pone como opcional