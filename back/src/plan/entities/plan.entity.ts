import { IPlan } from "src/interfaces/plan.interface";
import { DatosPersonalesEntity } from "src/usuario-datos-personales/entities/datos-personales.entity";
import { UsuarioEntity } from "src/usuario/entities/usuario.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'plan'})
export class PlanEntity implements IPlan {
    @PrimaryGeneratedColumn()
    idPlan: number;

    @Column({ type: 'varchar', length: 30, unique: true })
    nombrePlan: string;

    @Column({ type: 'varchar' })
    descripcion: string;

    @Column({ type: 'decimal', precision: 8, scale: 2 })
    precio: number;

    @Column({ type: 'date' })
    fCambioPrecio: Date;

    //Relacion Con Usuario
    @OneToMany(()=>DatosPersonalesEntity, datosPersonales => datosPersonales.plan) //dejar un solo campo plan
    datosPersonales: DatosPersonalesEntity[];
}
