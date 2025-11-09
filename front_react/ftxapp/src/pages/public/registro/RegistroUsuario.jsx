import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import HeaderCrud from "../../../components/componentsShare/header/HeaderCrud.jsx";
import DatosPersonalesTab from "../../../components/usuario/usuarioModificarPerfil/datospersonales/datosPersonales";
import DatosFisicosTab from "../../../components/usuario/usuarioModificarPerfil/datosfisicos/datosFisicos";
import { fetchGeneral } from "../../../components/componentsShare/utils/fetchGeneral.js";
import { useModal } from "../../../context/ModalContext.jsx";
import { useNavigate } from "react-router-dom";
import "./registroUsuario.css";

function RegistroUsuario() {
  const [activeStep, setActiveStep] = useState("plan");
  const [planesDisponibles, setPlanesDisponibles] = useState([]);
  const { showModal } = useModal();
  const { trigger } = useForm();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  // Cargar planes desde backend
  useEffect(() => {
    fetchGeneral({
      url: "http://localhost:8000/apiFtx/plan/all",
      method: "GET",
      onSuccess: (data) => setPlanesDisponibles(data),
      showModal,
    });
  }, []);

  const avanzarPaso = async () => {
    let camposAValidar = [];

    if (activeStep === "plan") camposAValidar = ["datosPersonales.idPlan"];
    else if (activeStep === "personales")
      camposAValidar = [
        "datosPersonales.nombre",
        "datosPersonales.apellido",
        "datosPersonales.dni",
        "datosBasicos.email",
        "datosPersonales.phone",
        "datosPersonales.fNacimiento",
        "datosPersonales.genero",
      ];

    const valido = await trigger(camposAValidar);
    if (valido) {
      if (activeStep === "plan") setActiveStep("personales");
      else if (activeStep === "personales") setActiveStep("fisicos");
    } else {
      showModal(
        "Completa los campos obligatorios antes de continuar",
        "error",
        2000
      );
    }
  };

  const handleRegistro = async () => {
    const datos = getValues();

    const payload = {
      datosBasicos: {
        email: datos.datosBasicos.email,
        rol: "usuario",
      },
      datosPersonales: {
        ...datos.datosPersonales,
        idPlan: parseInt(datos.datosPersonales.idPlan),
      },
      datosFisicos: datos.datosFisicos,
    };

    await fetchGeneral({
      url: "http://localhost:8000/apiFtx/auth/registro",
      method: "POST",
      body: payload,
      showModal,
      onSuccess: () => {
        showModal("Registro exitoso", "success", 2000);
      },
    });
  };

  return (
    <div className="container">
      <HeaderCrud title="Registro de Usuario" widthPercent={100} />
      <div className="registro-progreso">
        <div className={`paso ${activeStep === "plan" ? "activo" : ""}`}>
          1. Plan
        </div>
        <div className={`paso ${activeStep === "personales" ? "activo" : ""}`}>
          2. Datos Personales
        </div>
        <div className={`paso ${activeStep === "fisicos" ? "activo" : ""}`}>
          3. Datos Físicos
        </div>
      </div>

      <form
        className="registro-usuario-container"
        onSubmit={handleSubmit(handleRegistro)}
      >
        {/* Navegación por pasos */}
        <div className="registro-tabs">
          <button
            type="button"
            className={`tab-base ${activeStep === "plan" ? "tab-activa" : ""}`}
            onClick={() => setActiveStep("plan")}
          >
            Selección de Plan
          </button>
          <button
            type="button"
            className={`tab-base ${
              activeStep === "personales" ? "tab-activa" : ""
            }`}
            onClick={() => setActiveStep("personales")}
          >
            Datos Personales
          </button>
          <button
            type="button"
            className={`tab-base ${
              activeStep === "fisicos" ? "tab-activa" : ""
            }`}
            onClick={() => setActiveStep("fisicos")}
          >
            Datos Físicos
          </button>
        </div>

        {/* Contenido del paso activo */}
        <div className="registro-tab-contenido">
          {activeStep === "plan" && (
            <div className="fila-plan">
              <div className="campo-select-plan">
                <label className="label-selector-planes-registro">Selecciona tu plan</label>
                <select
                  {...register("datosPersonales.idPlan", { required: true })}
                >
                  <option value="">- Elegir un plan -</option>
                  {planesDisponibles.map((plan) => (
                    <option key={plan.idPlan} value={plan.idPlan}>
                      {plan.nombrePlan} - ${plan.precio} / mes
                    </option>
                  ))}
                </select>
                {errors?.datosPersonales?.idPlan && (
                  <span className="error">Debes seleccionar un plan</span>
                )}
              </div>

              <div className="boton-ver-detalles">
                <button
                  type="button"
                  onClick={() => navigate("/admin/planes")}
                >
                  Ver detalles de planes
                </button>
              </div>
            </div>
          )}

          {activeStep === "personales" && (
            <DatosPersonalesTab
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
            />
          )}

          {activeStep === "fisicos" && (
            <DatosFisicosTab register={register} errors={errors} />
          )}
        </div>

        {/* Botón de registro */}
        <div className="boton-guardar-registro">
          {activeStep === "fisicos" ? (
            <button type="submit" className="btn-guardar-registro">
              Crear cuenta
            </button>
          ) : (
            <button
              type="button"
              className="btn-guardar-registro"
              onClick={avanzarPaso}
            >
              Siguiente
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default RegistroUsuario;
