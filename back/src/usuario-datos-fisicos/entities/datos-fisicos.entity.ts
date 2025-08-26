import { IDatosFisicos } from "src/interfaces/datos-fisicos.interface";
import { UsuarioEntity } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";


@Entity({name:'datos_fisicos'})
export class DatosFisicosEntity implements IDatosFisicos{

@PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 }) 
  actividadDiaria: string;

  @Column({type:'decimal', precision:6, scale:3})
  peso: number;

  @Column({type:'int'}) 
  estatura: number;

  @Column({ type: 'varchar', length: 100 }) 
  metas: string;

  @Column({ type: 'varchar', length:255 }) 
  observaciones: string;


}
