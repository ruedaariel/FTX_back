import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { UsuarioEntity } from '../../usuario/entities/usuario.entity';

export enum MetodoDePago {
  TARJETA = 'tarjeta',
  MERCADOPAGO = 'mercadopago',
  TRANSFERENCIA = 'transferencia',
  EFECTIVO = 'efectivo',
}

@Entity({ name: 'Pagos' })
export class PagoEntity {
  @PrimaryGeneratedColumn()
  idPagos: number;

  @Column({ type: 'timestamp' })
  fechaPago: Date;

  @Column({ type: 'varchar', length: 32 })
  estado: string; // status devuelto por MercadoPago

  @Column({ type: 'int', default: 0 })
  diasAdicionales: number;

  @Column({ type: 'enum', enum: MetodoDePago })
  metodoDePago: MetodoDePago;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

   @ManyToOne(() => UsuarioEntity, (usuario) => usuario.pagos, {
    nullable: false,
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'usuarioId' })
  usuario: UsuarioEntity;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}