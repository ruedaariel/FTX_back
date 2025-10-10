import React, { useEffect, useState } from "react";
import "./selectorEjercicio.css";
import "../../componentsShare/grupoRadios/grupoRadios.css";
import "../../componentsShare/selectorGenerico/selectorGenerico.css";
//  Función genérica para llamadas al backend

import GrupoRadios from "../../componentsShare/grupoRadios/grupoRadios.jsx"; // ajustá la ruta según tu estructura
import SelectorGenerico from "../../componentsShare/selectorGenerico/selectorGenerico.jsx";

const SelectorEjercicio = ({ modoEjercicio, ejercicios,ejercicioSeleccionado, onSeleccionarEjercicio,onCambiarModo, loading, error }) => {
  
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  //const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState("");
 // const [modoEjercicio, setModoEjercicio] = useState("Crear");

 // 💡 Nuevo useEffect para depuración
  useEffect(() => {
    if (ejercicioSeleccionado) {
      console.log("--- DEBUG EJERCICIO ---");
      console.log("Objeto seleccionado:", ejercicioSeleccionado);
      // Asegurate de que la clave exista y no sea nula
      console.log("Valor de idEjercicioBasico:", ejercicioSeleccionado['idEjercicioBasico']); 
      console.log("Tipo de idEjercicioBasico:", typeof ejercicioSeleccionado['idEjercicioBasico']);
      console.log("-----------------------");
    } else {console.log("no teine nada", ejercicioSeleccionado)}
  }, [ejercicioSeleccionado]);
  
const isDisabled = modoEjercicio === "Crear";

  return (
    <div className="selector-ejercicios-container">
      <div className="selector-ejercicios-visual">
        {/* Radios a la izquierda */}
        <GrupoRadios
          opciones={["Crear", "Editar"]}
          valorSeleccionado={modoEjercicio}
          onChange={onCambiarModo}
          nombreGrupo="modoEjercicio"
        />

        {/* Selector a la derecha */}
        <SelectorGenerico
          opciones={ejercicios}
          valueKey="idEjercicioBasico"
          labelKey="nombreEjercicio"
          valorSeleccionado={ejercicioSeleccionado}
        
          onSeleccionar={onSeleccionarEjercicio}
          labelTexto="Seleccione Ejercicio"
          disabled = {isDisabled}
        />
      </div>

      {error && <p className="error-texto">Error: {error}</p>}
    </div>
  );
};

export default SelectorEjercicio;
