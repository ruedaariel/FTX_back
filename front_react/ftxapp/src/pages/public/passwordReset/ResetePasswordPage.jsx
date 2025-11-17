import React from "react";
import "./resetPasswordPage.css";
import logoNaranja from "../../../assets/Recursos/IconosLogos/logoSinLetrasNaranja.png";
import ftxImage13 from "../../../assets/Recursos/Imagenes/FTX_13.jpg";
import { useModal } from "../../../context/ModalContext";

import { useForm } from "react-hook-form";

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

   const { showModal } = useModal();

  const onSubmit = async (data) => {
  // Aquí podrías enviar el email al backend
  console.log("Email para resetear:", data.email);

  // Ejemplo de feedback visual
  showModal("Verificaremos tu correo electrónico. Si es correcto recibiras instrucciones para el reseteo de tu contraseña.", "info",0,true);
};



  return (
    <div className="reset-container">
      {/* Lado izquierdo: imagen motivacional */}
      <div className="reset-left">
        <img
          src={ftxImage13}
          alt="Imagen motivacional"
          className="reset-image"
        />
        <img src={logoNaranja} alt="Logo FTX" className="reset-logo" />
        <div className="reset-texto">
          <h2>Transformá tu vida</h2>
          <p>Entrenamiento personalizado para alcanzar tus metas.</p>
        </div>
      </div>

      {/* Lado derecho: formulario */}
      <div className="reset-right">
        <div className="reset-form-container">
          <h2>¿Olvidaste tu contraseña?</h2>
          <p>
            Ingresá tu correo y te enviaremos instrucciones para restablecerla.
          </p>

          <form className="reset-form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ejemplo@correo.com"
              className={errors.email ? "input-error" : ""}
              {...register("email", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Formato de correo inválido",
                },
              })}
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}

            <button type="submit">Enviar</button>
          </form>

          <div className="reset-links">
            <a href="/login">← Volver al login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
