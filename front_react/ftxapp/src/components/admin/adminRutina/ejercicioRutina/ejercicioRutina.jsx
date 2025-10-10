import React, { useEffect, useState } from "react";
import "./ejercicioRutina.css";
import { fetchGeneral } from "./../../../componentsShare/utils/fetchGeneral";
import { FaPlus, FaTrash } from "react-icons/fa";

const EjercicioRutina = ({
  ejercicio,
  onChange,
  onAgregar,
  onEliminar,
  index,
}) => {
  const [ejerciciosDisponibles, setEjerciciosDisponibles] = useState([]);

  //console.log("Agregar ejercicio en índice:", index);

  useEffect(() => {
    fetchGeneral({
      url: "http://localhost:8000/apiFtx/ejbasico/all",
      method: "GET",
      onSuccess: (data) => setEjerciciosDisponibles(data),
    });
  }, []);

  const handleFieldChange = (field, value) => {
    if (onChange) {
      onChange(index, { ...ejercicio, [field]: value });
    }
  };

  // console.log("Ejercicios:", ejerciciosDisponibles);

  return (
    <div className="ejercicio-rutina-row">
      <div className="ejercicio-rutina-field">
        <label>Ejercicio</label>
        <select
          value={ejercicio.idEjercicioBasico || ""}
          onChange={(e) =>
            handleFieldChange("idEjercicioBasico", parseInt(e.target.value))
          }
        >
          <option value="">Seleccione...</option>
          {ejerciciosDisponibles.map((ej) => (
            <option key={ej.idEjercicioBasico} value={ej.idEjercicioBasico}>
              {ej.nombreEjercicio}
            </option>
          ))}
        </select>
      </div>

      <div className="ejercicio-rutina-field">
        <label>Repeticiones</label>
        <input
          type="text"
          value={ejercicio.repeticiones || ""}
          onChange={(e) => handleFieldChange("repeticiones", e.target.value)}
        />
      </div>

      <div className="ejercicio-rutina-field">
        <label>Peso (kg)</label>
        <input
          type="number"
          value={ejercicio.peso || ""}
          onChange={(e) =>
            handleFieldChange("peso", parseFloat(e.target.value))
          }
        />
      </div>

      <div className="ejercicio-rutina-field">
        <label>Dificultad</label>
        <input
          type="text"
          value={ejercicio.dificultad || ""}
          placeholder="RPE, RIR o % de peso"
          onChange={(e) => handleFieldChange("dificultad", e.target.value)}
        />
      </div>

      <div className="ejercicio-rutina-field observaciones">
        <label>Observaciones</label>
        <textarea
          value={ejercicio.observaciones || ""}
          onChange={(e) => handleFieldChange("observaciones", e.target.value)}
        />
      </div>

      <div className="ejercicio-rutina-actions">
        <button className="btn-ejercicio-agregar" onClick={() => onAgregar(index)}>
          <FaPlus className="icon-agregar" />
        </button>

        <button className="btn-ejercicio-eliminar" onClick={() => onEliminar(index)}>
          <FaTrash className="icon-eliminar" />
        </button>
      </div>
    </div>
  );
};

export default EjercicioRutina;
