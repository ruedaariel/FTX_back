import React from "react";
import DiaRutina from "../diaRutina/diaRutina";

const SemanaRutina = ({
  semana,
  nroSemana,
  semanaIndex,
  onEjercicioChange,
  onAgregarEjercicio,
  onEliminarEjercicio
}) => {
  return (
    <div className="semana-rutina">
      <h3>Semana {nroSemana} – {semana.estadoSemana}</h3>
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
          />
        ))
      ) : (
        <p>No hay días cargados.</p>
      )}
    </div>
  );
};

export default SemanaRutina;
