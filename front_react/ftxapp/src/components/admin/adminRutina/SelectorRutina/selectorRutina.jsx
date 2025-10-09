import React, { useEffect, useState } from "react";
import "./selectorRutina.css";
//  Función genérica para llamadas al backend
import { fetchGeneral } from "./../../../componentsShare/utils/fetchGeneral.js";
import GrupoRadios from "./../../../componentsShare/grupoRadios/grupoRadios.jsx"; // ajustá la ruta según tu estructura
import SelectorGenerico from "./../../../componentsShare/selectorGenerico/selectorGenerico.jsx";

const SelectorRutinas = ({ onSeleccionarRutina }) => {
  const [rutinas, setRutinas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState("");
  const [modoRutina, setModoRutina] = useState("Crear");

  useEffect(() => {
    fetchGeneral({
      url: "http://localhost:8000/apiFtx/rutina/all",
      method: "GET",
      setLoading,
      setError,
      onSuccess: (data) => setRutinas(data),
    });
  }, []);

  


  return (
    <div className="selector-rutinas-container">
      <div className="selector-rutinas-visual">
        {/* Radios a la izquierda */}
        <GrupoRadios
          opciones={["Crear", "Editar", "Copiar"]}
          valorSeleccionado={modoRutina}
          onChange={setModoRutina}
          nombreGrupo="modoRutina"
        />

        {/* Selector a la derecha */}
        <SelectorGenerico
          opciones={rutinas}
          valueKey="idRutina"
          labelKey="nombreRutina"
          valorSeleccionado={rutinaSeleccionada?.id || ""}
          onSeleccionar={(rutina) => {setRutinaSeleccionada(rutina);
          if (onSeleccionarRutina) onSeleccionarRutina(rutina);}}
          labelTexto="Seleccione Rutina"
        />
      </div>

      {error && <p className="error-texto">Error: {error}</p>}
    </div>
  );
};

export default SelectorRutinas;
