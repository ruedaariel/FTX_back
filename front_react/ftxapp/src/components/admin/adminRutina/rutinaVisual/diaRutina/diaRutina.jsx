import React from "react";
import EjercicioRutina from "../../ejercicioRutina/ejercicioRutina";
import { useModal } from "../../../../../context/ModalContext";


// Componente que representa un día dentro de una semana de rutina
const DiaRutina = ({
  dia,                 // Objeto con datos del día (focus, ejercicios)
  nroDia,              // Número del día (1-indexado)
  onEjercicioChange,   // Callback para actualizar un ejercicio
  onAgregarEjercicio,  // Callback para agregar un nuevo ejercicio
  onEliminarEjercicio, // Callback para eliminar un ejercicio
  onGuardarDia,
  

}) => {
  return (
    <div className="dia-rutina">
      {/* Encabezado del día */}
      <div className="dia-header">
        <h4>
          Día {nroDia} -- Foco: {dia.focus}
        </h4>
        <button
          className="btn-guardar-dia"
          onClick={() => onGuardarDia(nroDia - 1)} // Se usa índice 0-based
        >
          Guardar día
        </button>
      </div>

      {/* Lista de ejercicios del día */}
      <div className="ejercicios-rutina-list">
        {dia.ejerciciosRutina.map((ejercicio, index) => (
          <EjercicioRutina
            key={index}
            index={index}
            ejercicio={ejercicio}
            onChange={(i, nuevoEjercicio) =>
              onEjercicioChange(nroDia - 1, i, nuevoEjercicio)
            }
            onAgregar={() => onAgregarEjercicio(nroDia - 1, index)}
            onEliminar={() => onEliminarEjercicio(nroDia - 1, index)}
            
          />
        ))}
      </div>
    </div>
  );
};

export default DiaRutina;
