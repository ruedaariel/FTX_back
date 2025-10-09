import React from "react";
import EjercicioRutina from "../../ejercicioRutina/ejercicioRutina";

const DiaRutina = ({ dia, nroDia, onEjercicioChange, onAgregarEjercicio, onEliminarEjercicio }) => {
  
  console.log("Día recibido:", dia);

  
  return (
    <div className="dia-rutina">
      <h4>Día {nroDia} – {dia.focus}</h4>
      <div className="ejercicios-rutina-list">
        {dia.ejerciciosRutina.map((ejercicio, index) => (
          <EjercicioRutina
            key={index}
            index={index}
            ejercicio={ejercicio}
            onChange={(i, nuevoEjercicio) => onEjercicioChange(nroDia - 1, i, nuevoEjercicio)}
            onAgregar={() => onAgregarEjercicio(nroDia - 1, index)}
            onEliminar={() => onEliminarEjercicio(nroDia - 1, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default DiaRutina;

