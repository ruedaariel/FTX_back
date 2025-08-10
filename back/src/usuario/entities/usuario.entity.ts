import { IUsuario } from "src/interfaces/usuario.interface";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DatosPersonalesEntity } from "../datos-personales/entities/datos-personales.entity";
import { DatosFisicosEntity } from "../datos-fisicos/entities/datos-fisicos.entity";


export enum ROL {
    USUARIO = 'usuario',
    ADMIN = 'admin',
}

@Entity({ name: 'usuario' })
export class UsuarioEntity implements IUsuario {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({  type: 'varchar',unique: true })
    email: string;
    @Column({type: 'varchar'})
    password: string;
    @Column({ type: 'enum', enum: ROL, default: ROL.USUARIO }) //necesario para que la bd lo tome como enumerado, sino lo toma como string
    rol: ROL;
    @CreateDateColumn({ //agrega automaticamente la fecha-hora del servidor, el name permite la creacion en la bd con snakeCase
        type: 'timestamp',
        name: 'f_creacion'
    })
    fCreacion: Date;
    @UpdateDateColumn({
        type: 'timestamp',
        name: 'f_ultimo_acceso'
    })
    fUltimoAcceso: Date;

    @OneToOne(() => DatosPersonalesEntity, {nullable: true, cascade:true})
    @JoinColumn() //crea una columna que apunta a DatosPersonalesEntity.id
    datosPersonales?: DatosPersonalesEntity; //opcional, dependiendo del tipo de ROL

     @OneToOne(() => DatosFisicosEntity,  {nullable: true, cascade:true})
     @JoinColumn()
    datosFisicos?: DatosFisicosEntity; //opcional, dependiendo del tipo de ROL
}
