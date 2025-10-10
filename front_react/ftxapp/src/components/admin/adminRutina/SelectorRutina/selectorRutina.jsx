import React, { useEffect, useState } from "react";
import "./selectorRutina.css";

// Utilidades y componentes compartidos
import { fetchGeneral } from "./../../../componentsShare/utils/fetchGeneral.js";
import GrupoRadios from "./../../../componentsShare/grupoRadios/grupoRadios.jsx";
import SelectorGenerico from "./../../../componentsShare/selectorGenerico/selectorGenerico.jsx";

const SelectorRutinas = ({
  onSeleccionarRutina, // Callback para enviar rutina seleccionada al componente padre
  modoRutina,          // Modo actual: "Crear", "Editar", "Copiar"
  setModoRutina        // Setter para cambiar el modo
}) => {
  // Estados locales
  const [rutinas, setRutinas] = useState([]);               // Lista de rutinas disponibles
  const [loading, setLoading] = useState(false);            // Estado de carga
  const [error, setError] = useState(null);                 // Estado de error
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState(""); // Rutina seleccionada localmente

  // Cargar todas las rutinas al montar el componente
  useEffect(() => {
    fetchGeneral({
      url: "http://localhost:8000/apiFtx/rutina/all",
      method: "GET",
      setLoading,
      setError,
      onSuccess: (data) => setRutinas(data),
    });
  }, []);

  // Limpiar selección al entrar en modo "Crear"
  useEffect(() => {
    if (modoRutina === "Crear") {
      setRutinaSeleccionada(null);
    }
  }, [modoRutina]);

  return (
    <div className="selector-rutinas-container">
      <div className="selector-rutinas-visual">
        {/* Selector de modo: Crear / Editar / Copiar */}
        <GrupoRadios
          opciones={["Crear", "Editar", "Copiar"]}
          valorSeleccionado={modoRutina}
          onChange={setModoRutina}
          nombreGrupo="modoRutina"
        />

        {/* Selector de rutina disponible */}
        <SelectorGenerico
          opciones={rutinas}
          valueKey="idRutina"
          labelKey="nombreRutina"
          valorSeleccionado={rutinaSeleccionada}
          onSeleccionar={(rutina) => {
            setRutinaSeleccionada(rutina);
            if (onSeleccionarRutina) onSeleccionarRutina(rutina);
          }}
          labelTexto="Seleccione Rutina"
        />
      </div>

      {/* Mensaje de error si falla la carga */}
      {error && <p className="error-texto">Error: {error}</p>}
    </div>
  );
};

export default SelectorRutinas;
