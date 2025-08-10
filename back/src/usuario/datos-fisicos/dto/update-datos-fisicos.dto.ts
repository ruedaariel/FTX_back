import { PartialType } from '@nestjs/mapped-types';
import { CreateDatosFisicoDto } from './create-datos-fisicos.dto';

export class UpdateDatosFisicoDto extends PartialType(CreateDatosFisicoDto) {}
