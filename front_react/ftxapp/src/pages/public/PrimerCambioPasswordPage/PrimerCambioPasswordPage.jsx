import React from "react";
import "./primerCambioPasswordPage.css";
import logoNaranja from "../../../assets/Recursos/IconosLogos/logoSinLetrasNaranja.png";
import ftxImage13 from "../../../assets/Recursos/Imagenes/FTX_13.jpg";
import { useForm, FormProvider } from "react-hook-form";
import { useModal } from "../../../context/ModalContext";
import SeguridadTab from "../../usuario/usuarioPerfil/components/seguridad/seguridadTab"; 
import { fetchGeneral } from "../../../components/componentsShare/utils/fetchGeneral";

const PrimerCambioPasswordPage = ({ usuario }) => {
  const methods = useForm({ mode: "onBlur" }); // podés usar "onChange" si querés validar mientras escribe
  const { showModal } = useModal();

  const onSubmit = async (data) => {
    const payload = {
      usuario,
      passwordActual: data.datosPersonales?.passwordActual,
      passwordNueva: data.datosPersonales?.passwordNueva,
      passwordConfirmar: data.datosPersonales?.passwordConfirmar,
    };

    // Construir datosBasicos para enviar al backend
  const datosBasicos = {
    
    password: data.datosPersonales?.passwordNueva // asegurarse que venga desde algún input
  };

  
  console.log("datosBasicos en perfilutils", datosBasicos);
      await fetchGeneral({
          url: `http://localhost:8000/apiFtx/usuario/update/${usuario.id}`,
          method: "PATCH",
          body: cambios,
          showModal,
          onSuccess: () => {
            showModal(
        "Contraseña actualizada correctamente. Iniciá sesión con tu nueva clave.",
        "success",
        0,
        true
      );
          },
        });
        
  };

  return (
    <div className="reset-container">
      {/* Lado izquierdo: imagen motivacional */}
      <div className="reset-left">
        <img src={ftxImage13} alt="Imagen motivacional" className="reset-image" />
        <img src={logoNaranja} alt="Logo FTX" className="reset-logo" />
        <div className="reset-texto">
          <h2>Bienvenido a FTX</h2>
          <p>Por seguridad, debés cambiar tu contraseña en tu primer ingreso.</p>
        </div>
      </div>

      {/* Lado derecho: formulario de seguridad */}
      <div className="reset-right">
        <div className="reset-form-container-primer-cambio">
          <h2>Cambio de contraseña</h2>
          <p>Completá los campos para actualizar tu clave de acceso.</p>

          {/* Formulario con validaciones */}
          <FormProvider {...methods}>
            <form
              className="reset-form-primer-cambio"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <SeguridadTab />

              {/* Botón único dentro del form */}
              <div className="reset-links">
                <button className="actualizar-button" type="submit">
                  Actualizar contraseña
                </button>
                <button className="actualizar-button">
                  Ir a Login
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default PrimerCambioPasswordPage;


