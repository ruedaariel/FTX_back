import React from "react";
import DiaRutina from "../diaRutina/diaRutina";

const SemanaRutina = ({
  semana,
  nroSemana,
  semanaIndex,
  onEjercicioChange,
  onAgregarEjercicio,
  onEliminarEjercicio,
  onGuardarDia,
  onGuardarSemanaAvanzar,
  esActiva,
  onToggleExpand,
}) => {
  const diaTieneEjercicios = (dia) =>
    dia.ejerciciosRutina.some(
      (ej) => ej.idEjercicioBasico && ej.idEjercicioBasico !== ""
    );

  const resumenVisual = semana.dias.map((dia, index) => {
    const activo = diaTieneEjercicios(dia);
    return (
      <div
        key={index}
        className={`cuadro-dia ${activo ? "activo" : "inactivo"}`}
        title={`Día ${index + 1}: ${activo ? "con ejercicios" : "descanso"}`}
      />
    );
  });

  return (
    <div className={`semana-rutina ${esActiva ? "activa" : ""}`}>
      <div
        className="semana-header"
        onClick={() => onToggleExpand(semanaIndex)}
        style={{ cursor: "pointer" }}
      >
        <h3>
          Semana {nroSemana} – {semana.estadoSemana}
        </h3>
        <div className="barra-semana">
          {resumenVisual}
          <span className="contador-activos">
            {semana.dias.filter(diaTieneEjercicios).length} de 7 días activos
          </span>
        </div>
        <button
          className="btn-guardar-semana"
          onClick={(e) => {
            e.stopPropagation(); // ✅ evita que el clic colapse la semana
            onGuardarSemanaAvanzar(semanaIndex);
          }}
        >
          Guardar semana
        </button>
      </div>

      {esActiva && (
        <div className="semana-contenido">
          {semana.dias?.length > 0 ? (
            semana.dias.map((dia, index) => (
              <DiaRutina
                key={index}
                dia={dia}
                nroDia={index + 1}
                onEjercicioChange={(diaIdx, ejIdx, nuevoEj) =>
                  onEjercicioChange(semanaIndex, diaIdx, ejIdx, nuevoEj)
                }
                onAgregarEjercicio={(diaIdx, ejIdx) =>
                  onAgregarEjercicio(semanaIndex, diaIdx, ejIdx)
                }
                onEliminarEjercicio={(diaIdx, ejIdx) =>
                  onEliminarEjercicio(semanaIndex, diaIdx, ejIdx)
                }
                onGuardarDia={(diaIdx) => onGuardarDia(semanaIndex, diaIdx)}
              />
            ))
          ) : (
            <p>No hay días cargados.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SemanaRutina;

