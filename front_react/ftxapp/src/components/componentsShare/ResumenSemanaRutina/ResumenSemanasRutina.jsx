import React from "react";
import "./ResumenSemanasRutina.css";

const ResumenSemanasRutina = ({ rutina }) => {
  if (!rutina?.semanas?.length) return null;

  return (
    <div className="resumen-semanas-container">
      {rutina.semanas.map((semana) => (
        <div key={semana.idSemana} className="barra-semana">
          <div className="etiqueta-semana">Semana {semana.nroSemana}</div>
          <div className="dias-semana">
            {semana.dias.map((dia) => {
              const cantidadEjercicios = dia.ejerciciosRutina?.length || 0;
              return (
                <div key={dia.idDia} className="cuadro-dia" title={`Día ${dia.nroDia}`}>
                  {cantidadEjercicios}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResumenSemanasRutina;

