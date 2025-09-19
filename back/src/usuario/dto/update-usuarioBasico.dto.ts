import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioBasicoDto } from './create-usuarioBasico.dto';
import { IsEmail, IsEnum, IsOptional, Matches } from 'class-validator';
import { ROL } from '../entities/usuario.entity';

export class UpdateUsuarioBasicoDto  {
    //no se pudo usar el PartialType, porque enel Creat no esta el password
        @IsOptional({ message: 'El correo no puede ser vacio' })
        @IsEmail({}, { message: 'El correo no es valido' })
        email?: string;
    
        @IsOptional({ message: 'la contraseña no puede ser vacia' })
        @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
            message: 'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número',
        })
        password?: string;
    
        @IsOptional({ message: 'El rol no puede ser vacio' })
        @IsEnum(ROL, { message: 'tipo de usuario invalido, debe ser usuario o admin (enumerado)' })
        rol?:ROL;
    
}
//con el PartialType, ya me lo pone como opcional