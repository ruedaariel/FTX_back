import { IUsuario } from "src/interfaces/usuario.interface";
import { RutinaEntity } from "src/rutina/entities/rutina.entity";
import { DatosFisicosEntity } from "src/usuario-datos-fisicos/entities/datos-fisicos.entity";
import { DatosPersonalesEntity } from "src/usuario-datos-personales/entities/datos-personales.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



export enum ROL {
    USUARIO = 'usuario',
    ADMIN = 'admin',
}

export enum ESTADO {
    ACTIVO = 'activo',
    INACTIVO = 'inactivo', //no esta al dia con el pago, se bloquea los servicios
    ARCHIVADO = 'archivado', // baja logica
}

@Entity({ name: 'usuario' })
export class UsuarioEntity implements IUsuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true }) //VER LENGTH
    email: string;

    @Column({ type: 'varchar' }) //VER LENGTH
    password: string;

    @Column({ type: 'enum', enum: ROL, default: ROL.USUARIO }) //necesario para que la bd lo tome como enumerado, sino lo toma como string
    rol: ROL;

    @Column({ type: 'enum', enum: ESTADO, default: ESTADO.ACTIVO })
    estado: ESTADO;

    @Column({ type: 'timestamp', name: 'f_baja', nullable: true }) //para borrado logico
    fBaja: Date;

    @CreateDateColumn({ //agrega automaticamente la fecha-hora del servidor, el name permite la creacion en la bd con snakeCase
        type: 'timestamp',
        name: 'f_creacion'
    })
    fCreacion: Date;
    @UpdateDateColumn({type: 'timestamp', name: 'f_ultimo_acceso'})
    fUltimoAcceso: Date;

    //relacion con datos personales
    //nullable = true porque puede ser que no tenga datos personales segun el ROL
    @OneToOne(() => DatosPersonalesEntity, { nullable: true, cascade: true })
    @JoinColumn() //crea una columna que apunta a DatosPersonalesEntity.id
    datosPersonales?: DatosPersonalesEntity; //opcional, dependiendo del tipo de ROL

    //relacion con datos Fisicos
    //nullable = true porque puede ser que no tenga datos fisicos segun el ROL
    @OneToOne(() => DatosFisicosEntity, { nullable: true, cascade: true })
    @JoinColumn()
    datosFisicos?: DatosFisicosEntity; //opcional, dependiendo del tipo de ROL

    //relacion con Rutina
    @OneToMany(() => RutinaEntity, rutina => rutina.usuario) //ojo no esta cascade en true
    rutinas?: RutinaEntity[];


}
