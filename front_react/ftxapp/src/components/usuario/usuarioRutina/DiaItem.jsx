import React from "react";
import EjercicioItem from "./EjercicioItem";

const DiaItem = ({ dia, onSeleccionEjercicio, ejercicioSeleccionado }) => {

  return (
    <div className="dia-item">
      {/* <h4>Día {dia.nroDia} – Focus: {dia.focus}</h4> */}
      {/* {dia.ejerciciosRutina.map((ejercicio) => (
        <EjercicioItem key={ejercicio.idEjercicioRutina} ejercicio={ejercicio} />
      ))} */}
      {dia.ejerciciosRutina.map((ejercicio) => {
  const seleccionado = ejercicio.idEjercicioRutina === ejercicioSeleccionado?.idEjercicioRutina;
  return (
    <div
      key={ejercicio.idEjercicioRutina}
      className={`ejercicio-item ${ejercicio.ejercicioHecho ? "hecho" : ""}`}
      onClick={() => onSeleccionEjercicio?.(ejercicio)}
    >
      <input type="checkbox" checked={ejercicio.ejercicioHecho} readOnly />
      <span>{ejercicio.ejercicioBasico.nombreEjercicio}</span>

      {seleccionado && (
        <div className="detalle-inline">
          <p><strong>Repeticiones:</strong> {ejercicio.repeticiones}</p>
          <p><strong>Peso:</strong> {ejercicio.peso} kg</p>
          <p><strong>Observaciones:</strong> {ejercicio.ejercicioBasico.observaciones}</p>
        </div>
      )}
    </div>
    );
})}
    </div>
  );
};


export default DiaItem;
