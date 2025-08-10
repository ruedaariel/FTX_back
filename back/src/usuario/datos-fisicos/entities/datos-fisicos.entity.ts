import { IDatosFisicos } from "src/interfaces/datos-fisicos.interface";
import { UsuarioEntity } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";


@Entity({name:'datos_fisicos'})
export class DatosFisicosEntity implements IDatosFisicos{

@PrimaryColumn()
  id: number;

  @Column()
  actividadDiaria: string;

  @Column('float')
  peso: number;

  @Column('int')
  estatura: number;

  @Column()
  metas: string;

  @Column({ nullable: true })
  observaciones: string;


}
