import { Exclude, Expose, Transform, Type } from "class-transformer";
import { METODODEPAGO } from "../entity/pago.entity";
import { formatToDdMmYy } from "src/utils/transformar-fecha";
import { UsuarioRtaDto } from "src/usuario/dto/usuario-rta.dto";

export class RtaPagoDto {
    @Expose()
    idPagos: number;

    @Expose()
    @Transform(({ value }) => formatToDdMmYy(value))
    fechaPago: Date | null;

    @Expose()
     @Transform(({ value }) => formatToDdMmYy(value))
    fechaVencimiento: Date | null;

    @Exclude()
    estado: string; // status devuelto por MercadoPago

    @Exclude()
    diasAdicionales: number;

    @Expose()
    metodoDePago: METODODEPAGO;

    @Expose()
    monto: number;

    @Expose()
    usuarioId: number;

    @Exclude()
    createdAt: Date;

    @Expose()
    @Type(()=>UsuarioRtaDto)
    usuario?:UsuarioRtaDto;
}