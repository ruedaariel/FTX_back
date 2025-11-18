
export function transformarFecha(fecha: string): Date | null {

  const fechaValida = new Date(fecha);
  if (!isNaN(fechaValida.getTime())) {
    return fechaValida;
  }
  return null
}

export function sumaMes(date: Date, months: number): Date {
  const d = new Date(date.getTime());
  // usar UTC para evitar problemas de zona horaria
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth();
  const day = d.getUTCDate();
  const hour = d.getUTCHours();
  const minute = d.getUTCMinutes();
  const second = d.getUTCSeconds();
  const millisecond = d.getUTCMilliseconds();

  // crear nueva fecha en UTC con el mes sumado
  const target = new Date(Date.UTC(year, month + months, day, hour, minute, second, millisecond));

  // Si el día original no existe en el mes destino (ej. 31 ene -> feb), Date.UTC ajusta automáticamente;
  // a la fecha mas cercana.
  return target;
}

export function normalizarDateA0(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));
}

export function isPagoVigente(fechaPago: Date): { activo: boolean; expira: Date } {
  const hoy = new Date();
  const expira = sumaMes(fechaPago, 1);
  return { activo: hoy.getTime() < expira.getTime(), expira };
}

export function calcularFechaVencimiento(fechaPago: Date, fechaPagoEsDateOnly = false): Date {
  const base = fechaPagoEsDateOnly ? normalizarDateA0(fechaPago) : new Date(fechaPago.getTime());
  const fechaVencimiento = sumaMes(base, 1);
  return fechaVencimiento;
}

