import React, { useState } from "react";
import "./EjercicioPorDia.css";

const EjercicioItem = ({ ejercicio }) => {
  const [expandido, setExpandido] = useState(false);
  const [hecho, setHecho] = useState(false);

  const toggleExpandido = () => setExpandido(!expandido);
  const toggleHecho = () => setHecho(!hecho);

  const { ejercicioBasico } = ejercicio;

  // Depuración
  console.log("Renderizando ejercicio:", ejercicioBasico?.nombreEjercicio);

  // Si no hay datos básicos, mostrar mensaje
  if (!ejercicioBasico) {
    return (
      <div className="ejercicio-item ejercicio-incompleto">
        <p>Este ejercicio no tiene datos básicos asignados.</p>
      </div>
    );
  }

  return (
    <div className={`ejercicio-item ${expandido ? "expandido" : ""}`}>
      <div className="ejercicio-header" onClick={toggleExpandido}>
        <input
          type="checkbox"
          checked={hecho}
          onChange={toggleHecho}
          className="checkbox-ejercicio"
        />
        <span className="nombre-ejercicio">
          {ejercicioBasico.nombreEjercicio || "Ejercicio sin nombre"}
        </span>
      </div>

      {expandido && (
        <div className="ejercicio-detalle">
          <p><strong>Repeticiones:</strong> {ejercicio.repeticiones || "—"}</p>
          <p><strong>Peso:</strong> {ejercicio.peso ? `${ejercicio.peso} kg` : "—"}</p>
          <p><strong>Dificultad:</strong> {ejercicio.dificultad || "—"}</p>
          <p><strong>Observaciones:</strong> {ejercicio.observaciones || "—"}</p>
          <p><strong>Tips:</strong> {ejercicioBasico.observaciones || "—"}</p>
          {ejercicioBasico.videoLink ? (
            <a href={ejercicioBasico.videoLink} target="_blank" rel="noopener noreferrer">
              Ver explicación
            </a>
          ) : (
            <p className="video-faltante">No hay video disponible</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EjercicioItem;

