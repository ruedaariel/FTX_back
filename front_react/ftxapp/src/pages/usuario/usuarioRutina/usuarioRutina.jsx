import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


// Componentes principales
import HeaderCrud from "../../../components/componentsShare/header/HeaderCrud.jsx";

// Contexto de modal
import { useModal } from "../../../context/ModalContext.jsx";

// Utilidades
import { fetchGeneral } from "../../../components/componentsShare/utils/fetchGeneral.js";
// import RutinaPorSemana from "../../../components/usuario/usuarioRutina/RutinaPorSemana.jsx";
import RutinaInteractiva from "./components/RutinaGenericaInteractiva.jsx";


function UsuarioRutina() {

  const location = useLocation();
  const usuario = location.state?.usuario;
  const navigate = useNavigate();



  // Estados principales
  const [rutinaUsuario, setRutinaUsuario] = useState(null); // Rutina seleccionada desde el selector
  const { showModal } = useModal(); // Modal global
  
  // const rutinaABuscar = 129; // ID de la rutina del usuario, esto debería venir de la sesión o contexto de usuario

  // Cargar rutina desde backend al seleccionar una existente
  useEffect(() => {
    
      fetchGeneral({
        url: `http://localhost:8000/apiFtx/usuario/rutinas/${usuario.id}`,
        method: "GET",
        onSuccess: (data) => {
          setRutinaUsuario(data);
        },
        showModal,
      });
    
  }, []);

  useEffect(() => {
  if (Array.isArray(rutinaUsuario) && rutinaUsuario.length === 0) {
    showModal(`${usuario.datosPersonales.nombre}, no tienes rutinas asignadas`, "info", 2000);
    setTimeout(() => {
      navigate("/usuario");
    }, 2000);
  }
}, [rutinaUsuario]);

  // console.log("%crutinaUsuario----->","color: yellow; font-weight: bold;",rutinaUsuario);
// Render principal
  return (
    <>
    <div className="container">
      <HeaderCrud title={`${usuario.datosPersonales.nombre}, esta es tu página de rutinas`} widthPercent={100}/>
    
    {(Array.isArray(rutinaUsuario) && rutinaUsuario.length > 0) && (
     <RutinaInteractiva rutina={rutinaUsuario} />
    
    )}
        
      </div>
    </>

  );
}

export default UsuarioRutina;