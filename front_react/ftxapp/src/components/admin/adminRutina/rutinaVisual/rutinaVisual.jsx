import React, { useState, useEffect } from "react";
import SemanaRutina from "./semanaRutina/semanaRutina";
import "./rutinaModular.css";

const RutinaVisual = ({ rutina }) => {
  // const [rutinaEditable, setRutinaEditable] = useState(rutina);

  const [rutinaEditable, setRutinaEditable] = useState(null);

useEffect(() => {
  if (rutina) {
    setRutinaEditable(rutina);
    console.log("Rutina recibida:", rutina);
  }
}, [rutina]);


  if (!rutinaEditable?.semanas?.length) return <p>No hay semanas cargadas.</p>;

  const handleEjercicioChange = (semanaIndex, diaIndex, ejercicioIndex, nuevoEjercicio) => {
    const nuevaRutina = { ...rutinaEditable };
    nuevaRutina.semanas[semanaIndex].dias[diaIndex].ejerciciosRutina[ejercicioIndex] = nuevoEjercicio;
    setRutinaEditable(nuevaRutina);
  };

  const handleAgregarEjercicio = (semanaIndex, diaIndex, ejercicioIndex) => {
    const nuevaRutina = { ...rutinaEditable };
    nuevaRutina.semanas[semanaIndex].dias[diaIndex].ejerciciosRutina.splice(ejercicioIndex + 1, 0, {
      idEjercicioBasico: "",
      repeticiones: "",
      peso: "",
      dificultad: "",
      observaciones: ""
    });
    setRutinaEditable(nuevaRutina);
  };

  const handleEliminarEjercicio = (semanaIndex, diaIndex, ejercicioIndex) => {
    const nuevaRutina = { ...rutinaEditable };
    nuevaRutina.semanas[semanaIndex].dias[diaIndex].ejerciciosRutina.splice(ejercicioIndex, 1);
    setRutinaEditable(nuevaRutina);
  };

if (!rutina || !Array.isArray(rutina.semanas) || rutina.semanas.length === 0) {
  return <p>La rutina no tiene semanas cargadas.</p>;
}




  return (
    <div className="rutina-visual">
      {rutinaEditable.semanas.map((semana, index) => (
        <SemanaRutina
          key={index}
          semana={semana}
          nroSemana={index + 1}
          semanaIndex={index}
          onEjercicioChange={(diaIdx, ejIdx, nuevoEj) =>
            console.log("Cambio de ejercicio:", diaIdx, ejIdx, nuevoEj)
          }
          onAgregarEjercicio={(diaIdx, ejIdx) =>
            console.log("Agregar ejercicio en:", diaIdx, ejIdx)
          }
          onEliminarEjercicio={(diaIdx, ejIdx) =>
            console.log("Eliminar ejercicio en:", diaIdx, ejIdx)
          }
        />
      ))}
    </div>
  );
};

export default RutinaVisual;

