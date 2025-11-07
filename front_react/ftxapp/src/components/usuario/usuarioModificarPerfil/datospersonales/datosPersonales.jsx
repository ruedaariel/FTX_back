// Importación de React y los estilos específicos del tab
import React, {useEffect, useState} from "react";
import "./datosPersonales.css";

// Componente que representa la pestaña "Datos Personales"
// Recibe props desde el formulario global: register (para vincular campos) y errors (para mostrar validaciones)
const DatosPersonalesTab = ({ register, watch, setValue, errors}) => {

  const emailActual = watch("datosBasicos.email"); // valor original del formulario
  const [nuevoEmail, setNuevoEmail] = useState(emailActual || "");
  const [confirmacion, setConfirmacion] = useState("");

  // Si coinciden, actualiza el campo real del formulario
  useEffect(() => {
    if (nuevoEmail && confirmacion && nuevoEmail === confirmacion) {
      setValue("datosBasicos.email", nuevoEmail);
    }
  }, [nuevoEmail, confirmacion, setValue]);
  
  return (
    <div className="formulario-personales">
      {/* Sección: Nombre y Apellido */}
      <div className="nombre-apellido">
        <div className="campo-form">
          <label>Nombre</label>
          {/* Campo vinculado al formulario global con validación requerida */}
          <input
            {...register("datosPersonales.nombre", {
              required: "El nombre es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
              maxLength: { value: 30, message: "Máximo 100 caracteres" },
            })}
          />
          {/* Mensaje de error si el campo está vacío */}
          {errors?.datosPersonales?.nombre && (
            <span className="error">
              {errors.datosPersonales.nombre.message}
            </span>
          )}
        </div>

        

        <div className="campo-form">
          <label>Apellido</label>
          <input
            {...register("datosPersonales.apellido", {
              required: "El apellido es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
              maxLength: { value: 30, message: "Máximo 100 caracteres" },
            })}
          />
          {errors?.datosPersonales?.apellido && (
            <span className="error">
              {errors.datosPersonales.apellido.message}
            </span>
          )}
        </div>

        <div className="campo-form">
          <label>DNI</label>
          <input
            {...register("datosPersonales.dni", {
              required: "El DNI es obligatorio",
              minLength: {
                value: 8,
                message: "Debe tener exactamente 8 dígitos",
              },
              maxLength: {
                value: 8,
                message: "Debe tener exactamente 8 dígitos",
              },
              pattern: {
                value: /^[0-9]{8}$/,
                message: "Solo se permiten números (8 dígitos)",
              },
            })}
          />
          {errors?.datosPersonales?.dni && (
            <span className="error">
              {errors.datosPersonales.dni.message}
            </span>
          )}
        </div>
      </div>

      {/* Sección: Email y Teléfono */}
      <div className="mail-telefono">
      {/* Campo editable sin register */}
      <div className="campo-form">
        <label>Nuevo Email</label>
        <input
          type="email"
          value={nuevoEmail}
          onChange={(e) => setNuevoEmail(e.target.value)}
        />
      </div>

      {/* Confirmación */}
      <div className="campo-form">
        <label>Confirmar Email</label>
        <input
          type="email"
          value={confirmacion}
          onChange={(e) => setConfirmacion(e.target.value)}
        />

        {/* Feedback visual */}
      {nuevoEmail && confirmacion && nuevoEmail !== confirmacion && (
        <p className="error">Los correos no coinciden</p>
      )}
      {nuevoEmail && nuevoEmail === confirmacion && (
        <p className="ok">Los correos coinciden</p>
      )}
      </div>

      
    </div>
  

      {/* Sección: Fecha de nacimiento y Género */}
      <div className="nacimiento-genero">
        <div className="campo-form">
          <label>Teléfono</label>
          <input
            {...register("datosPersonales.phone", {
              required: "El teléfono es obligatorio",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Debe contener solo números (8 a 15 dígitos)",
              },
            })}
          />
          {errors?.datosPersonales?.phone && (
            <span className="error">
              {errors.datosPersonales.phone.message}
            </span>
          )}
        </div>
        <div className="campo-form">
          <label>Fecha de nacimiento</label>
          <input
            type="date"
            {...register("datosPersonales.fNacimiento", {
              required: "La fecha de nacimiento es obligatoria",
              validate: (value) => {
                if (!value) return "Este campo no puede estar vacío";

                const fechaIngresada = new Date(value);
                const hoy = new Date();
                const edadMinima = new Date();
                edadMinima.setFullYear(hoy.getFullYear() - 13);

                if (fechaIngresada > hoy) {
                  return "La fecha no puede ser futura";
                }

                if (fechaIngresada > edadMinima) {
                  return "Debes tener al menos 13 años";
                }

                return true;
              },
            })}
          />
          {errors?.datosPersonales?.fNacimiento && (
            <span className="error">
              {errors.datosPersonales.fNacimiento.message}
            </span>
          )}
        </div>

        <div className="campo-form">
          <label>Género</label>
          <select {...register("datosPersonales.genero", { required: true })}>
            <option value="mujer">Mujer</option>
            <option value="hombre">Hombre</option>
            <option value="otro">Otro</option>
          </select>
          {errors?.datosPersonales?.genero && (
            <span className="error">Selecciona un género</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatosPersonalesTab;
