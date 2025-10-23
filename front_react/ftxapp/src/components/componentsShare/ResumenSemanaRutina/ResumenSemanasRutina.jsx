import React from "react";
import "./ResumenSemanasRutina.css"; // Asegurate de crear este archivo CSS

const ResumenSemanasRutina = ({ rutina }) => {
  if (!rutina?.semanas?.length) return null;

  return (
    <div className="resumen-semanas-container">
      {rutina.semanas.map((semana) => (
        <div key={semana.idSemana} className="barra-semana">
          <div className="etiqueta-semana">Semana {semana.nroSemana}</div>
          <div className="dias-semana">
            {semana.dias.map((dia) => (
              <div key={dia.idDia} className="cuadro-dia">
                {dia.nroDia}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResumenSemanasRutina;
