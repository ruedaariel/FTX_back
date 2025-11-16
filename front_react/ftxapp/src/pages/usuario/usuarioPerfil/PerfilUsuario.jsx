// Importación de React y hooks
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


// Estilos específicos para esta vista
import "./perfilUsuario.css";

// Hook de formularios
import { useForm } from "react-hook-form";

// Componentes reutilizables
import HeaderCrud from "../../../components/componentsShare/header/HeaderCrud.jsx";

// Secciones del perfil
//import Tabs from "../../../components/usuario/usuarioModificarPerfil/Tabs";
import ImagenTab from "./components/imagensuscripcion/imagenTab.jsx";
import DatosPersonalesTab from "./components/datospersonales/datosPersonales.jsx";
import DatosFisicosTab from "./components/datosfisicos/datosFisicos";
import SeguridadTab from "./components/seguridad/seguridadTab.jsx";

// Datos simulados del usuario
import obtenerUsuarioMock from "./obtenerUsuarioMock";

// Utilidades
import { fetchGeneral } from "../../../components/componentsShare/utils/fetchGeneral.js";
import { useModal } from "../../../context/ModalContext.jsx";

// Helpers para transformación y comparación de datos
import {
  normalizarFecha,
  formatearFechaParaBackend,
  normalizarFechaParaBackend,
  mapearFormularioParaBackend,
  extraerCambios
} from "./utils/perfilUtils.js";


function PerfilUsuario() {
  const [activeTab, setActiveTab] = useState("imagen");
   const { showModal } = useModal();
   const location = useLocation();
  const usuario = location.state?.usuario;

  // console.log("usuario",usuario);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      datosBasicos: {
        idUsuario: usuario.id,
        email: usuario.email,
        rol: usuario.rol,
        estado: usuario.estado,
        password: "",
      },
      datosPersonales: {
        ...usuario.datosPersonales,
        fNacimiento: normalizarFecha(usuario.datosPersonales.fNacimiento),
      },
      datosFisicos: {
        ...usuario.datosFisicos,
      },
    },
    mode: "onBlur",
  });

  // Datos originales para comparar cambios
  const original = {
    datosBasicos: {
      idUsuario: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      estado: usuario.estado,
      password: "",
    },
    datosPersonales: {
      ...usuario.datosPersonales,
      idPlan: usuario.datosPersonales.plan?.idPlan || null,
      fNacimiento: usuario.datosPersonales.fNacimiento,
    },
    datosFisicos: usuario.datosFisicos,
  };

  // Función que guarda los cambios del perfil
  // const handleGuardarPerfil = async () => {
  //   const actual = getValues();
  
  const handleGuardarPerfil = async (data) => {
    const datosTransformados = mapearFormularioParaBackend(data);

    
    const cambios = extraerCambios(original, datosTransformados);
    // console.log("datostransformados",datosTransformados);
    

    // console.log("cambios-----",cambios);

    // Normaliza fecha si fue modificada
    if (cambios.datosPersonales?.fNacimiento)  {
      cambios.datosPersonales.fNacimiento = normalizarFechaParaBackend(cambios.datosPersonales.fNacimiento);
    }


    // Enviar al backend
    await fetchGeneral({
      url: `http://localhost:8000/apiFtx/usuario/update/${usuario.id}`,
      method: "PATCH",
      body: cambios,
      showModal,
      onSuccess: () => {
        showModal("Perfil actualizado correctamente", "succes", 2000, true);
      },
    });
  };

    // console.log("nombre",getValues("datosPersonales.nombre"));

    return (
    <div className="container">
      <HeaderCrud title={`${getValues("datosPersonales.nombre")}, esta es tu página de perfil`} widthPercent={100} />

      <form className="perfil-usuario-container" onSubmit={handleSubmit(handleGuardarPerfil)}>
        {/* Navegación por pestañas */}
        <div className="perfil-usuario-header">
          <div className="perfil-tabs">
            <button  type="button" className={`tab-base ${activeTab === "imagen" ? "tab-activa sin-borde-inferior" : ""}`} onClick={() => setActiveTab("imagen")}>
              Imagen y Suscripción
            </button>
            <button  type="button" className={`tab-base ${activeTab === "personales" ? "tab-activa sin-borde-inferior" : ""}`} onClick={() => setActiveTab("personales")}>
              Datos Personales
            </button>
            <button  type="button" className={`tab-base ${activeTab === "fisicos" ? "tab-activa sin-borde-inferior" : ""}`} onClick={() => setActiveTab("fisicos")}>
              Datos Físicos
            </button>
            <button  type="button" className={`tab-base ${activeTab === "seguridad" ? "tab-activa sin-borde-inferior" : ""}`} onClick={() => setActiveTab("seguridad")}>
              Seguridad
            </button>
          </div>
        </div>

        {/* Contenido de la pestaña activa */}
        <div className="perfil-tab-contenido">
          {activeTab === "imagen" && (
            <ImagenTab register={register} setValue={setValue} watch={watch} errors={errors} />
          )}
          {activeTab === "personales" && (
            <DatosPersonalesTab register={register} setValue={setValue} watch={watch} errors={errors} />
          )}
          {activeTab === "fisicos" && (
            <DatosFisicosTab register={register} errors={errors} />
          )}
          {activeTab === "seguridad" && (
            <SeguridadTab register={register} errors={errors} watch={watch} />
          )}
        </div>

        {/* Botón de guardado */}
        <div className="boton-guardar-perfil">
          <button  type="submit" className="btn-guardar-perfil-usuario" >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}
export default PerfilUsuario;
