import React, { useState } from "react";
import "./seguridadTab.css";



const SeguridadTab = ({ register, errors, watch }) => {
  const [showActual, setShowActual] = useState(false);
  const [showNueva, setShowNueva] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);

  return (
    <div className="seguridad-tab">
      <h3>Cambiar contraseña</h3>
    
      <div className="campo-form">
        <label>Contraseña actual</label>
        <div className="input-con-icono">
          <input
            type={showActual ? "text" : "password"}
            {...register("datosPersonales.passwordActual", {
              required: "La contraseña actual es obligatoria"
            })}
          />
          <button type="button" onClick={() => setShowActual(!showActual)}>
            {showActual ? "🙈" : "👁️"}
          </button>
        </div>
        {errors?.datosPersonales?.passwordActual && (
          <span className="error">{errors.datosPersonales.passwordActual.message}</span>
        )}
      </div>

      <div className="campo-form">
        <label>Nueva contraseña</label>
        <div className="input-con-icono">
          <input
            type={showNueva ? "text" : "password"}
            {...register("datosPersonales.passwordNueva", {
              required: "La nueva contraseña es obligatoria",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                message: "Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
              }
            })}
          />
          <button type="button" onClick={() => setShowNueva(!showNueva)}>
            {showNueva ? "🙈" : "👁️"}
          </button>
        </div>
        {errors?.datosPersonales?.passwordNueva && (
          <span className="error">{errors.datosPersonales.passwordNueva.message}</span>
        )}
      </div>

      <div className="campo-form">
        <label>Confirmar nueva contraseña</label>
        <div className="input-con-icono">
          <input
            type={showConfirmar ? "text" : "password"}
            {...register("datosPersonales.passwordConfirmar", {
              required: "Confirmar contraseña es obligatorio",
              validate: (value) =>
                value === watch("datosPersonales.passwordNueva") || "Las contraseñas no coinciden"
            })}
          />
          <button type="button" onClick={() => setShowConfirmar(!showConfirmar)}>
            {showConfirmar ? "🙈" : "👁️"}
          </button>
        </div>
        {errors?.datosPersonales?.passwordConfirmar && (
          <span className="error">{errors.datosPersonales.passwordConfirmar.message}</span>
        )}
      </div>
      
    </div>
  );
};

export default SeguridadTab;
