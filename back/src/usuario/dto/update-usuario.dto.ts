import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsEmail, IsEnum, IsOptional, Matches } from 'class-validator';
import { ROL } from '../entities/usuario.entity';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    // @IsOptional()
    // @IsEmail({}, { message: 'El correo no es valido' })
    // email?: string;

    // @IsOptional()
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    //     message: 'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número',
    // })
    // password?: string;

    // @IsOptional()
    // @IsEnum(ROL, { message: 'tipo de usuario invalido, debe ser usuario o admin (enumerado)' })
    // rol?: ROL;

}
