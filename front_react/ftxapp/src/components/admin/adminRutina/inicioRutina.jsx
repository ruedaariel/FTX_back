import { useState, useEffect } from "react";

// Componentes principales
import HeaderCrud from "./components/componentsShare/header/HeaderCrud.jsx";
import SelectorRutinas from "./components/admin/adminRutina/SelectorRutina/selectorRutina.jsx";
import RutinaUsuario from "./components/admin/adminRutina/rutinaUsuario/rutinaUsario.jsx";
import RutinaVisual from "./components/admin/adminRutina/rutinaVisual/rutinaVisual.jsx";
import ModalInfoTemporizado from "./components/componentsShare/Modal/ModalInfoTemporizado.jsx";

// Utilidades
import { fetchGeneral } from "./components/componentsShare/utils/fetchGeneral.js";

// Datos de ejemplo (opcional)
import rutinaData from "./components/admin/adminRutina/rutina.json";

// Componentes comentados (no utilizados actualmente)
/*
import PantallaClientes from "./components/admin/adminClientes/pantallaClientes/PantallaClientes.jsx";
import AdminApp from './components/admin/adminClientes/';
import PanelAdmin from './components/PanelAdmin/panelAdmin.jsx';
import GestionRutinas from "./components/admin/adminRutina/gestionRutinas/gestionRutinas.jsx";
import { BrowserRouter } from "react-router-dom";
*/

function inicioRutina () {
  // Estados principales
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState(null);
  const [rutinaData, setRutinaData] = useState(null);
  const [modoRutina, setModoRutina] = useState("editar"); // "crear", "copiar", "editar"
  const [reiniciarRutina, setReiniciarRutina] = useState(false);

  // Modal informativo
  const [mostrarModalInfo, setMostrarModalInfo] = useState(false);
  const [mensajeModalInfo, setMensajeModalInfo] = useState("");

  // Mostrar mensaje temporal en modal
  const mostrarModalInfoTemporizado = (mensaje, duracion = 3000) => {
    setMensajeModalInfo(mensaje);
    setMostrarModalInfo(true);
    setTimeout(() => setMostrarModalInfo(false), duracion);
  };

  // Cargar rutina desde backend al seleccionar una existente
  useEffect(() => {
    if (rutinaSeleccionada?.idRutina) {
      fetchGeneral({
        url: `http://localhost:8000/apiFtx/rutina/${rutinaSeleccionada.idRutina}`,
        method: "GET",
        onSuccess: (data) => setRutinaData(data),
      });
    }
  }, [rutinaSeleccionada]);

  // Generar rutina vacía al entrar en modo "Crear"
  useEffect(() => {
    if (modoRutina === "Crear") {
      const rutinaNueva = {
        nombreRutina: "",
        nombreUsuario: "",
        semanas: [
          {
            dias: [
              {
                focus: "",
                ejerciciosRutina: [
                  {
                    idEjercicioBasico: "",
                    repeticiones: "",
                    peso: "",
                    dificultad: "",
                    observaciones: ""
                  }
                ]
              }
            ]
          }
        ]
      };
      setRutinaSeleccionada(rutinaNueva);
      setRutinaData(rutinaNueva);
    }
  }, [modoRutina]);

  // Reiniciar interfaz después de guardar rutina
  const resetearInterfaz = () => {
    const rutinaNueva = {
      nombreRutina: "",
      nombreUsuario: "",
      semanas: [
        {
          dias: [
            {
              focus: "",
              ejerciciosRutina: [
                {
                  idEjercicioBasico: "",
                  repeticiones: "",
                  peso: "",
                  dificultad: "",
                  observaciones: ""
                }
              ]
            }
          ]
        }
      ]
    };

    setRutinaSeleccionada(rutinaNueva);
    setRutinaData(rutinaNueva);
    setModoRutina("Crear");
  };

  // Render principal
  return (
    <>
      {/* Encabezado */}
      <HeaderCrud title="Gestion de Rutinas" />

      {/* Selector de rutina y modo */}
      <SelectorRutinas
        onSeleccionarRutina={setRutinaSeleccionada}
        modoRutina={modoRutina}
        setModoRutina={setModoRutina}
      />

      {/* Formulario de edición/creación */}
      <RutinaUsuario
        rutinaSeleccionada={rutinaSeleccionada}
        rutinaEditable={rutinaData}
        mostrarModalInfo={mostrarModalInfoTemporizado}
        modoRutina={modoRutina}
        onResetearInterfaz={resetearInterfaz}
      />

      {/* Visualización de rutina */}
      {rutinaData && (
        <RutinaVisual rutina={rutinaData} modoRutina={modoRutina} />
      )}

      {/* Modal informativo */}
      {mostrarModalInfo && (
        <ModalInfoTemporizado
          isOpen={mostrarModalInfo}
          title="Información"
          message={mensajeModalInfo}
          onClose={() => setMostrarModalInfo(false)}
          autoCloseMs={3000}
        />
      )}
    </>
  );
}

export default inicioRutina;