import { format } from "date-fns";
import { GENERO } from "../entities/datos-personales.entity";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { ESTADO } from "src/constantes/estado.enum";
import { PlanRtaDto } from "src/plan/dto/plan-rta.dto";


export class DatosPersonalesRtaDto {
  @Exclude()
  id: number;
  @Expose()
  nombre: string;
  @Expose()
  apellido: string;
  @Expose()
  dni: string;
  @Expose()
  phone: string;
  @Expose()
  genero: GENERO;
  @Expose()
  @Type(() => PlanRtaDto)
  plan: PlanRtaDto;
  @Expose()
  @Transform(({ value }) => value ? format(value, 'dd/MM/yyyy') : null) //transforma a string con formato y tambien acepta null
  fNacimiento: string;
  @Expose()
  imagenPerfil: string;
  @Exclude()
  estado: ESTADO;
}

