// Importación de React y hooks
import React, { useState, useEffect } from "react";
// Estilos específicos para esta vista
import "./perfilUsuario.css";
// Hook de formularios
import { useForm } from "react-hook-form";
// Header reutilizable
import HeaderCrud from "../../../components/componentsShare/header/HeaderCrud.jsx";
// Tabs y secciones del perfil
import Tabs from "../../../components/usuario/usuarioModificarPerfil/Tabs";
import ImagenTab from "../../../components/usuario/usuarioModificarPerfil/imagensuscripcion/imagenTab";
import DatosPersonalesTab from "../../../components/usuario/usuarioModificarPerfil/datospersonales/datosPersonales";
import DatosFisicosTab from "../../../components/usuario/usuarioModificarPerfil/datosfisicos/datosFisicos";
import SeguridadTab from "../../../components/usuario/usuarioModificarPerfil/seguridad/seguridadTab.jsx";
// Mock de datos de usuario
import obtenerUsuarioMock from "./obtenerUsuarioMock";

// Componente principal que carga los datos del usuario
function PaginaPerfil() {
  const [usuario, setUsuario] = useState(null);

  // Simula la carga de datos al montar el componente
  useEffect(() => {
    const datos = obtenerUsuarioMock();
    setUsuario(datos);
  }, []);

  // Mientras se cargan los datos, se muestra un mensaje
  if (!usuario) return <p>Cargando perfil...</p>;

  // Una vez cargado, se renderiza el componente principal
  return <PerfilUsuario usuario={usuario} />;
}

// Componente que gestiona el formulario completo del perfil
function PerfilUsuario({ usuario }) {
  const [activeTab, setActiveTab] = useState("imagen"); // Estado para controlar la pestaña activa

  // Hook de react-hook-form con valores iniciales
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      datosPersonales: {
        ...usuario.datosPersonales,
        email: usuario.email,
        idUsuario: usuario.id,
        
      },
      datosFisicos: usuario.datosFisicos,
    },
    mode: "onBlur", // valida al salir del campo
  });

  // Función que se ejecuta al enviar el formulario
  const onSubmit = (formData) => {
    console.log("Datos enviados:", formData);
    // Aquí iría la lógica para enviar los datos al backend
  };

  console.log("usuario", usuario);

  return (
    // Formulario único que engloba todas las secciones
    <form
      className="perfil-usuario-container"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Header opcional */}
      {/* <HeaderCrud title="Gestion de Rutinas" /> */}

      {/* Navegación por pestañas */}
      <div className="perfil-usuario-header">
        <div className="perfil-tabs">
          <button
            className={`tab-base ${
              activeTab === "imagen" ? "tab-activa sin-borde-inferior" : ""
            }`}
            onClick={() => setActiveTab("imagen")}
          >
            Imagen y Suscripción
          </button>
          <button
            className={`tab-base ${
              activeTab === "personales" ? "tab-activa sin-borde-inferior" : ""
            }`}
            onClick={() => setActiveTab("personales")}
          >
            Datos Personales
          </button>
          <button
            className={`tab-base ${
              activeTab === "fisicos" ? "tab-activa sin-borde-inferior" : ""
            }`}
            onClick={() => setActiveTab("fisicos")}
          >
            Datos Físicos
          </button>
          <button
            className={`tab-base ${
              activeTab === "seguridad" ? "tab-activa sin-borde-inferior" : ""
            }`}
            onClick={() => setActiveTab("seguridad")}
          >
            Seguridad
          </button>
        </div>
      </div>

      {/* Contenido de la pestaña activa */}
      <div className="perfil-tab-contenido">
        {activeTab === "imagen" && (
          <ImagenTab
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />
        )}

        {activeTab === "personales" && (
          <DatosPersonalesTab register={register}  errors={errors} />
        )}

        {activeTab === "fisicos" && (
          <DatosFisicosTab register={register} errors={errors} />
        )}

        {activeTab === "seguridad" && (
          <SeguridadTab register={register} errors={errors} watch={watch} />
        )}
      </div>

        <div className="boton-guardar-perfil">
      {/* Botón de guardado general */}
      <button type="submit" className="btn-guardar-cambios">
        Guardar cambios
      </button>
      </div>
    </form>
  );
}

export default PaginaPerfil;
