import React, { useEffect, useState } from "react";
import "./selectorEjercicio.css";
import "../../componentsShare/grupoRadios/grupoRadios.css";
import "../../componentsShare/selectorGenerico/selectorGenerico.css";
//  Función genérica para llamadas al backend
import { fetchGeneral } from "../../componentsShare/utils/fetchGeneral.js";
import GrupoRadios from "../../componentsShare/grupoRadios/grupoRadios.jsx"; // ajustá la ruta según tu estructura
import SelectorGenerico from "../../componentsShare/selectorGenerico/selectorGenerico.jsx";

const SelectorEjercicio = ({ modoEjercicio, ejercicioSeleccionado, setModoEjercicio,onSeleccionarEjercicio }) => {
  const [ejercicios, setEjercicios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState("");
 // const [modoEjercicio, setModoEjercicio] = useState("Crear");

  useEffect(() => {
    fetchGeneral({
      url: "http://localhost:8000/apiFtx/ejbasico/all",
      method: "GET",
      setLoading,
      setError,
      onSuccess: (data) => setEjercicios(data),
    });
  }, []);

  


  return (
    <div className="selector-ejercicios-container">
      <div className="selector-ejercicios-visual">
        {/* Radios a la izquierda */}
        <GrupoRadios
          opciones={["Crear", "Editar"]}
          valorSeleccionado={modoEjercicio}
          onChange={setModoEjercicio}
          nombreGrupo="modoEjercicio"
        />

        {/* Selector a la derecha */}
        <SelectorGenerico
          opciones={ejercicios}
          valueKey="idEjercicioBasico"
          labelKey="nombreEjercicio"
          valorSeleccionado={ejercicioSeleccionado?.id || ""}
        
          onSeleccionar={onSeleccionarEjercicio}
          labelTexto="Seleccione Ejercicio"
        />
      </div>

      {error && <p className="error-texto">Error: {error}</p>}
    </div>
  );
};

export default SelectorEjercicio;
