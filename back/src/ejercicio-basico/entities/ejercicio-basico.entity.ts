import { IEjercicioBasico } from "src/interfaces/ejercicio-basico";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ejercicio_basico')
export class EjercicioBasicoEntity implements IEjercicioBasico {

 @PrimaryGeneratedColumn()
    idEjercicioBasico: number;
    @Column({ type: 'varchar', unique: true })
   nombreEjercicio: string;
    @Column({ type: 'varchar', nullable: true })
   imagenLink: string;
    @Column({ type: 'varchar', nullable: true }) 
    videoLink: string;
}
