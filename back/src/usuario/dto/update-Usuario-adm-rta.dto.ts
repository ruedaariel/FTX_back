import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioBasicoDto } from './create-usuarioBasico.dto';
import { IsEmail, IsEnum, IsInt, IsOptional, Matches } from 'class-validator';
import { ROL } from '../entities/usuario.entity';
import { ESTADO } from '../../constantes/estado.enum';

export class UpdateUsuarioAdmRtaDto  {
    //no se pudo usar el PartialType, porque enel Creat no esta el password
        id:number;
        email?: string;
        estado?: ESTADO;
        idPlan?:number;
}
//con el PartialType, ya me lo pone como opcional