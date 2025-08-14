import { PartialType } from '@nestjs/mapped-types';
import { CreateDatosPersonalesDto } from './create-datos-personales.dto';

export class UpdateDatosPersonalesDto extends PartialType(CreateDatosPersonalesDto) {}
//con el PartialType, ya me lo pone como opcional