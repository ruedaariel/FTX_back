import React from "react";
import "./primerCambioPasswordPage.css";
import logoNaranja from "../../../assets/Recursos/IconosLogos/logoSinLetrasNaranja.png";
import ftxImage13 from "../../../assets/Recursos/Imagenes/FTX_13.jpg";
import { useForm } from "react-hook-form";
import { useModal } from "../../../context/ModalContext";
import SeguridadTab from "../../usuario/usuarioPerfil/components/seguridad/seguridadTab"; 

const PrimerCambioPasswordPage = ({ usuario }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" }); // podés usar "onChange" si querés validar mientras escribe

  const { showModal } = useModal();

  const onSubmit = async (data) => {
    const payload = {
      usuario,
      passwordActual: data.datosPersonales.passwordActual,
      passwordNueva: data.datosPersonales.passwordNueva,
      passwordConfirmar: data.datosPersonales.passwordConfirmar,
    };

    console.log("Enviando cambio de contraseña:", payload);

    try {
      // await api.post("/usuarios/cambiar-password", payload);
      showModal(
        "Contraseña actualizada correctamente. Iniciá sesión con tu nueva clave.",
        "success",
        0,
        true
      );
    } catch (error) {
      showModal(
        "Hubo un error al actualizar la contraseña. Verificá los datos e intentá nuevamente.",
        "error",
        0,
        true
      );
    }
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
          <form
            className="reset-form-primer-cambio"
            onSubmit={handleSubmit(onSubmit)}
          >
            <SeguridadTab register={register} errors={errors} watch={watch} />

            {/* Botón único dentro del form */}
            <div className="reset-links">
              <button className="actualizar-button" type="submit">
              Actualizar contraseña
            </button>
            <button className="actualizar-button" >
              Ir a Login
            </button>
            {/* <a href="/login">← Volver al login</a> */}
          </div>
            
          </form>

          {/* <div className="reset-links">
            <a href="/login">← Volver al login</a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PrimerCambioPasswordPage;

