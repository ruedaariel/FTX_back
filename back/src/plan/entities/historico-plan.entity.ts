import { IHistoricoPlan } from "src/interfaces/historico-plan.interface";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PlanEntity } from "./plan.entity";

@Entity({name: 'historico_plan'})
export class HistoricoPlanEntity implements IHistoricoPlan {
    @PrimaryGeneratedColumn()
    idPlanHistorico: number;

    @Column()
    idPlanOrigen: number; //guarda el id del plan para identificarlo si cambia el nombre

    @Column({ type: 'varchar', length: 30 })
    nombrePlan: string;

    @Column({ type: 'varchar' })
    descripcion: string;

    @Column({ type: 'decimal', precision: 8, scale: 2 })
    precio: number;

    @Column({ type: 'timestamp' })
    fCambioInicio: Date;

    @CreateDateColumn({  type: 'timestamp'    })
    fCambioFin: Date;

    @Column({type:'varchar'})
    detalleCambio: string;

   //Relacion con Plan
   @ManyToOne(()=>PlanEntity, plan => plan.historicoPlanes)
   @JoinColumn()
   plan: PlanEntity;

}
