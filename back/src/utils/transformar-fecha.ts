
export function transformarFecha(fecha: string): Date | null {

  const fechaValida = new Date(fecha);
  if (!isNaN(fechaValida.getTime())) {
    return fechaValida;
  }
  return null
}
