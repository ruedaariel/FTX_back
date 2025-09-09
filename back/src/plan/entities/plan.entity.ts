import { IPlan } from "src/interfaces/plan.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Plan implements IPlan {
    @PrimaryGeneratedColumn()
    idPlan: number;

    @Column({ type: 'varchar', length: 30 })
    nombrePlan: string;

    @Column({ type: 'varchar' })
    descripcion: string;

    @Column({ type: 'decimal', precision: 8, scale: 2 })
    precio: number;

    @Column({ type: 'date' })
    fCambioPrecio: Date;
}
