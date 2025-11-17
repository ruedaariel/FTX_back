import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import HeaderCrud from "../../../components/componentsShare/header/HeaderCrud.jsx";
import DatosPersonalesTab from "../../usuario/usuarioPerfil/components/datospersonales/datosPersonales.jsx";
import DatosFisicosTab from "../../usuario/usuarioPerfil/components/datosfisicos/datosFisicos.jsx";
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

  const handleValidarFisicosYRegistrar = async () => {
    const camposFisicos = [
      "datosFisicos.peso",
      "datosFisicos.estatura",
      "datosFisicos.actividadDiaria",
      "datosFisicos.metas",
      "datosFisicos.observaciones",
      // agregá los campos que realmente están en DatosFisicosTab
    ];

    const valido = await trigger(camposFisicos);
    if (valido) {
      handleRegistro();
    } else {
      showModal(
        "Completa los campos obligatorios antes de crear tu cuenta",
        "error",
        2500
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

    console.log("payload", payload);

    await fetchGeneral({
      url: "http://localhost:8000/apiFtx/usuario/register",
      method: "POST",
      body: payload,
      showModal,
      onSuccess: () => {
        showModal(
          "¡Felicitaciones!  por dar este primer paso. \n \n Recibirás instrucciones en tu correo",
          "success",
          2000
        );
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
          2. Personales
        </div>
        <div className={`paso ${activeStep === "fisicos" ? "activo" : ""}`}>
          3. Físicos
        </div>
      </div>
      {/* <div className="registro-progreso">
        <div className={`paso ${activeStep === "plan" ? "activo" : ""}`}>
          {activeStep === "plan" ? "🟠" : "⚪"}  Plan
        </div>
        <div className={`paso ${activeStep === "personales" ? "activo" : ""}`}>
          {activeStep === "personales" ? "🟠" : "⚪"}  Datos Personales
        </div>
        <div className={`paso ${activeStep === "fisicos" ? "activo" : ""}`}>
          {activeStep === "fisicos" ? "🟠" : "⚪"}  Datos Físicos
        </div>
      </div> */}

     

      <form
        className="registro-usuario-container"
        onSubmit={async (e) => {
          e.preventDefault();
          const valido = await trigger(); // valida todos los campos registrados

          if (valido) {
            handleRegistro(); // si todo está bien, se envía
          } else {
            showModal(
              "Completa todos los campos obligatorios antes de crear tu cuenta",
              "error",
              2500
            );
          }
        }}
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
                <label className="label-selector-planes-registro">
                  Selecciona tu plan
                </label>
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
                <button type="button" onClick={() => navigate("/admin/planes")}>
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
            <button
              type="button"
              className="btn-guardar-registro"
              onClick={handleValidarFisicosYRegistrar}
            >
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
