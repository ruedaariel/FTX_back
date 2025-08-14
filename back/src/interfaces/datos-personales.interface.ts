import { GENERO, PLAN } from "src/usuario-datos-personales/entities/datos-personales.entity";



export interface IDatosPersonales {
  id: number;
  plan: PLAN;
  nombre: string;
  apellido: string;
  dni: string;
  phone: string;
  genero: GENERO;
}
