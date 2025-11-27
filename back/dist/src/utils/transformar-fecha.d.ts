export declare function transformarFecha(fecha: string): Date | null;
export declare function sumaMes(date: Date, months: number): Date;
export declare function normalizarDateA0(date: Date): Date;
export declare function isPagoVigente(fechaPago: Date): {
    activo: boolean;
    expira: Date;
};
export declare function calcularFechaVencimiento(fechaPago: Date, fechaPagoEsDateOnly?: boolean): Date;
export declare function toLocalDateOnly(d: Date): Date;
export declare function formatToDdMmYy(value: unknown): string | null;
export declare function transforma_a_DDMMYY(value: unknown): string | null | unknown;
