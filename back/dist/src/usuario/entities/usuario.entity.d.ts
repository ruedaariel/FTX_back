import { ESTADO } from '../../constantes/estado.enum';
import { IUsuario } from "src/interfaces/usuario.interface";
import { PagoEntity } from '../../pagos/entity/pago.entity';
import { RutinaEntity } from "../../rutina/entities/rutina.entity";
import { DatosFisicosEntity } from "../../usuario-datos-fisicos/entities/datos-fisicos.entity";
import { DatosPersonalesEntity } from "../../usuario-datos-personales/entities/datos-personales.entity";
import { ROL } from '../../constantes/rol';
export declare class UsuarioEntity implements IUsuario {
    id: number;
    email: string;
    password: string;
    rol: ROL;
    estado: ESTADO;
    passwordChangedAt: Date | null;
    level: number;
    fBaja: Date | null;
    fCreacion: Date;
    fUltimoAcceso: Date;
    datosPersonales?: DatosPersonalesEntity;
    datosFisicos?: DatosFisicosEntity;
    rutinas?: RutinaEntity[];
    pagos: PagoEntity[];
}
