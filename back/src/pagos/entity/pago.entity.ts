import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
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
  estado: string;

  @Column({ type: 'int', default: 0 })
  diasAdicionales: number;

  @Column({ type: 'enum', enum: MetodoDePago })
  metodoDePago: MetodoDePago;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  // 🔗 RELACIÓN MUCHOS A UNO: Muchos pagos pertenecen a un usuario
  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.pagos, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'usuarioId' })
  usuario: UsuarioEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}