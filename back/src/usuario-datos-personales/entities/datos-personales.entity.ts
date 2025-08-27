import { IDatosPersonales } from "src/interfaces/datos-personales.interface";
import { Column, Entity, PrimaryColumn } from "typeorm";

export enum PLAN {
    BASICO = 'basico',
    PRO = 'pro',
    PREMIUM = 'premium',
}

export enum GENERO {
    HOMBRE = 'hombre',
    MUJER = 'mujer',
    OTRO = 'otro',
}

@Entity({ name: 'datospersonales' })
export class DatosPersonalesEntity implements IDatosPersonales {
    @PrimaryColumn()
    id: number;

    @Column({ type: 'enum', enum: PLAN, default: PLAN.BASICO, })
    plan: PLAN;

    @Column({ type: 'varchar', length: 100, nullable: false, })
    nombre: string;

    @Column({ type: 'varchar', length: 100, nullable: false, })
    apellido: string;

    @Column({ type: 'varchar', length: 8, nullable: false, })
    dni: string;

    @Column({ type: 'varchar', length: 10, })
    phone: string;

    @Column({ type: 'enum', enum: GENERO, nullable: false, })
    genero: GENERO;

    @Column({ type: 'varchar', length: 255, nullable: true, })
    imagenPerfil: string;
}
