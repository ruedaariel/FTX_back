import React, { useEffect, useState } from "react";
import "./ejercicioRutina.css";
import { fetchGeneral } from "./../../../componentsShare/utils/fetchGeneral";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useModal } from "../../../../context/ModalContext";

const EjercicioRutina = ({
  ejercicio,
  onChange,
  onAgregar,
  onEliminar,
  index,
  
}) => {
  const [ejerciciosDisponibles, setEjerciciosDisponibles] = useState([]);

  const [errorRepeticiones, setErrorRepeticiones] = useState("");
  const [errorPeso, setErrorPeso] = useState("");

  //console.log("Agregar ejercicio en índice:", index);

  useEffect(() => {
    fetchGeneral({
      url: "http://localhost:8000/apiFtx/ejbasico/all",
      method: "GET",
      onSuccess: (data) => setEjerciciosDisponibles(data),
    });
  }, []);

  const { showModal } = useModal();


  const handleFieldChange = (field, value) => {
    // Permitir borrar el campo
    if (value === "") {
      if (field === "repeticiones") setErrorRepeticiones("");
      if (field === "peso") setErrorPeso("");
      onChange(index, { ...ejercicio, [field]: value });
      return;
    }

    if (field === "repeticiones") {
      const regex = /^([1-9]|10)\s*x\s*([1-9]|1[0-9]|2[0-5])$/;
      if (!regex.test(value)) {
        setErrorRepeticiones("Formato inválido. Ej: 5 x 12 (máx 10x25)");
      } else {
        setErrorRepeticiones("");
      }
      onChange(index, { ...ejercicio, [field]: value });
      return;
    }

    if (field === "peso") {
      const pesoNum = parseFloat(value);
      if (isNaN(pesoNum) || pesoNum <= 0 || pesoNum > 500) {
        setErrorPeso("Peso inválido. Debe ser entre 1 y 500 kg");
      } else {
        setErrorPeso("");
      }
      onChange(index, { ...ejercicio, [field]: pesoNum });
      return;
    }

    onChange(index, { ...ejercicio, [field]: value });
  };

  const handleAgregarValidado = () => {
  const { idEjercicioBasico, repeticiones, peso } = ejercicio;

  if (!idEjercicioBasico) {
    //mostrarModalInfo?.("Debés seleccionar un ejercicio antes de agregar.");
    showModal("Debés seleccionar un ejercicio antes de agregar.","error");
    return;
  }

  if (!repeticiones || repeticiones.trim() === "") {
    //mostrarModalInfo?.("Ingresá repeticiones en formato válido (Ej: 5 x 12).");
    showModal("Ingresá repeticiones en formato válido (Ej: 5 x 12).","error");
    return;
  }

  if (!peso || parseFloat(peso) <= 0) {
    mostrarModalInfo?.("Ingresá un peso válido mayor a 0.","error");
    return;
  }

  onAgregar(index);
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
        <label
          htmlFor={`repeticiones-${index}`}
          title="Formato: series x repeticiones. Ej: 5 x 12"
        >
          Repeticiones
        </label>
        <input
          id={`repeticiones-${index}`}
          type="text"
          value={ejercicio.repeticiones || ""}
          onChange={(e) => handleFieldChange("repeticiones", e.target.value)}
          className={errorRepeticiones ? "input-error" : ""}
        />
        {errorRepeticiones && <p className="error-text">{errorRepeticiones}</p>}
      </div>

      <div className="ejercicio-rutina-field">
        <label htmlFor={`peso-${index}`} title="Máximo permitido: 500 kg">
          Peso (kg)
        </label>
        <input
          id={`peso-${index}`}
          type="number"
          value={ejercicio.peso || ""}
          onChange={(e) => handleFieldChange("peso", e.target.value)}
          className={errorPeso ? "input-error" : ""}
        />
        {errorPeso && <p className="error-text">{errorPeso}</p>}
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
        <button
          className="btn-ejercicio-agregar"
          onClick={handleAgregarValidado}
        >
          <FaPlus className="icon-agregar" />
        </button>

        <button
          className="btn-ejercicio-eliminar"
          onClick={() => onEliminar(index)}
        >
          <FaTrash className="icon-eliminar" />
        </button>
      </div>
    </div>
  );
};

export default EjercicioRutina;
