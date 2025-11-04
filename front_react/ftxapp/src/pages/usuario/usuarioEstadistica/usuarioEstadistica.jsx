import { useState, useEffect } from "react";

// Componentes principales
import HeaderCrud from "../../../components/componentsShare/header/HeaderCrud.jsx";

// Contexto de modal
import { useModal } from "../../../context/ModalContext.jsx";

// Utilidades
import { fetchGeneral } from "../../../components/componentsShare/utils/fetchGeneral.js";
import AvanceRutina from "./avanceRutina.jsx";




function UsuarioRutina() {
  // Estados principales
  const [rutinaUsuario, setRutinaUsuario] = useState(null); // Rutina seleccionada desde el selector
  const { showModal } = useModal(); // Modal global
  
  const rutinaABuscar = 129; // ID de la rutina del usuario, esto debería venir de la sesión o contexto de usuario

  // Cargar rutina desde backend al seleccionar una existente
  useEffect(() => {
    if (rutinaABuscar) {
      fetchGeneral({
        url: `http://localhost:8000/apiFtx/rutina/${rutinaABuscar}`,
        method: "GET",
        onSuccess: (data) => {
          setRutinaUsuario(data);
        },
        showModal,
      });
    }
  }, []);

  console.log("%crutinaUsuario----->","color: yellow; font-weight: bold;",rutinaUsuario);
// Render principal
  return (
    <>
    <div className="container">
      <HeaderCrud title="Estadisticas de Usuario" widthPercent={100}/>
    {rutinaUsuario ? (
      <AvanceRutina rutina={rutinaUsuario} />

    ) : (
      <p className="mensaje-cargando">Cargando rutina...</p>
    )}
      </div>
    </>

  );
}

export default UsuarioRutina;