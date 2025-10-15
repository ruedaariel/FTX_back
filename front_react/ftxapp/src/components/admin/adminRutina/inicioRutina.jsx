import { useState, useEffect } from "react";

// Componentes principales
import HeaderCrud from "./../../componentsShare/header/HeaderCrud.jsx";
import SelectorRutinas from "./../adminRutina/SelectorRutina/selectorRutina.jsx";
import RutinaUsuario from "./../adminRutina/rutinaUsuario/rutinaUsario.jsx";
import RutinaVisual from "./rutinaVisual/rutinaVisual.jsx";
import ModalInfoTemporizado from "./../../componentsShare/Modal/ModalInfoTemporizado.jsx";
import { useModal } from "../../../context/ModalContext.jsx";


// Utilidades
import { fetchGeneral } from "./../../componentsShare/utils/fetchGeneral.js";




// Datos de ejemplo (opcional)
//import rutinaData from "./rutina.json";

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
  const { showModal } = useModal();

  

  

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
        mostrarModalInfo={showModal}
        modoRutina={modoRutina}
        onResetearInterfaz={resetearInterfaz}
      />

      {/* Visualización de rutina */}
      {rutinaData && (
        <RutinaVisual
  rutina={rutinaData}
  modoRutina={modoRutina}
  mostrarModalInfo={showModal}
/>
      )}

      {/* Modal informativo */}
      
    </>
  );
}

export default inicioRutina;