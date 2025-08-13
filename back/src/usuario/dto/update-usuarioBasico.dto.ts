import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioBasicoDto } from './create-usuarioBasico.dto';

export class UpdateUsuarioBasico extends PartialType(CreateUsuarioBasicoDto) {}
//con el PartialType, ya me lo pone como opcional