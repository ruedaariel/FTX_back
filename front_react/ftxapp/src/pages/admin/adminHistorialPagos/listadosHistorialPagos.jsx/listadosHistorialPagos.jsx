import React from "react";
import "./PagosListadosHistorial.css";

const PagosListadosHistorial = ({ pagos }) => {

// normaliza la el monto en pesos
function formatearMonto(monto) {
  // Si viene como null, undefined o vacío → devolver "$ 0.00"
  if (monto == null || monto === "") {
    return "$ 0.00";
  }

  // Convertir a número
  const numero = Number(monto);

  // Si no es un número válido → devolver "$ 0.00"
  if (isNaN(numero)) {
    return "$ 0.00";
  }

  // Formatear con separadores de miles y 2 decimales
  return "$ " + numero.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}




  return (
    <div className="pagos-wrapper">
      {/* Vista tipo tabla (desktop) */}
      <div className="pagos-grid desktop-only">
        <div className="pago-card encabezado">
          <span>Nombre</span>
          <span>Estado</span>
          <span>Fecha de Pago</span>
          <span>Vencimiento</span>
          <span>Método</span>
          <span>Monto</span>
        </div>
        {pagos.map((pago) => (
          <div key={pago.idPagos} className="pago-card">
            <span>{pago.nombre} {pago.apellido}</span>
            <span>{pago.estadoUsuario}</span>
            <span>{pago.fechaPago}</span>
            <span>{pago.fechaVencimiento || "-"}</span>
            <span>{pago.metodoDePago}</span>
            {/* <span>$ {parseFloat(pago.monto).toLocaleString("es-AR")}</span> */}
            <span> {formatearMonto(pago.monto)}</span>
          </div>
        ))}
      </div>

      {/* Vista tipo card (mobile) */}
      <div className="pagos-cards mobile-only">
        {pagos.map((pago) => (
          <div key={pago.idPagos} className="pago-card-mobile">
            <p><strong>Nombre:</strong> {pago.nombre} {pago.apellido}</p>
            <p><strong>Estado:</strong> {pago.estadoUsuario}</p>
            <p><strong>Fecha de Pago:</strong> {pago.fechaPago}</p>
            <p><strong>Vencimiento:</strong> {pago.fechaVencimiento || "-"}</p>
            <p><strong>Método:</strong> {pago.metodoDePago}</p>
            <p><strong>Monto:</strong> $ {parseFloat(pago.monto).toLocaleString("es-AR")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PagosListadosHistorial;
