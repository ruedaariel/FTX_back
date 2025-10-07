import React from "react";
import "./RutinaVisual.css";

const RutinaVisual = ({ rutina }) => {
  return (
    <div className="rutina-wrapper">
      <header className="rutina-header">
        <h2>{rutina.nombreRutina}</h2>
        <span className={`estado-rutina ${rutina.estadoRutina}`}>{rutina.estadoRutina}</span>
      </header>

      {rutina.semanas.map((semana, i) => (
        <section key={i} className="semana-section">
          <h3>Semana {semana.nroSemana}</h3>
          <p className="estado-semana">Estado: {semana.estadoSemana}</p>

          {semana.dias.map((dia, j) => (
            <div key={j} className="dia-box">
              <div className="dia-header">
                <h4>Día {dia.nroDia}</h4>
                <span className="focus-muscular">{dia.focus}</span>
              </div>

              <div className="ejercicios-list">
                {dia.ejerciciosRutina.map((ej, k) => (
                  <div key={k} className="ejercicio-card">
                    <div className="ejercicio-info">
                      <p><strong>Repeticiones:</strong> {ej.repeticiones}</p>
                      <p><strong>Peso:</strong> {ej.peso} kg</p>
                      <p><strong>Dificultad:</strong> {ej.dificultad}</p>
                      {ej.observaciones && (
                        <p><strong>Obs:</strong> {ej.observaciones}</p>
                      )}
                    </div>
                    <div className="ejercicio-actions">
                      <button className="btn eliminar">🗑 Eliminar</button>
                      <button className="btn agregar">➕ Agregar</button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn grabar-dia">
                Grabar ejercicios de Semana {semana.nroSemana} / Día {dia.nroDia}
              </button>
            </div>
          ))}
        </section>
      ))}

      <footer className="rutina-footer">
        <button className="btn guardar">💾 Guardar Rutina</button>
        <button className="btn eliminar-rutina">🗑 Eliminar Rutina</button>
      </footer>
    </div>
  );
};

export default RutinaVisual;
