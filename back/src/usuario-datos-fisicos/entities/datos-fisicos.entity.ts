import { IDatosFisicos } from "src/interfaces/datos-fisicos.interface";
import { UsuarioEntity } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";


@Entity({name:'datos_fisicos'})
export class DatosFisicosEntity implements IDatosFisicos{

@PrimaryColumn()
  id: number;

  @Column({ type: 'varchar' }) //VER LENGTH
  actividadDiaria: string;

  @Column({type:'decimal', precision:6, scale:3})
  peso: number;

  @Column({type:'int'}) //VER LENGTH
  estatura: number;

  @Column({ type: 'varchar' }) //VER LENGTH
  metas: string;

  @Column({ type: 'varchar' }) //VER LENGTH
  observaciones: string;


}
