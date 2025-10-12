import React, { useEffect, useState } from "react";
import "./RutinaUsuario.css";
import { fetchGeneral } from "./../../../componentsShare/utils/fetchGeneral";
import { guardarRutinaEnBackend } from "./../../../componentsShare/utils/guardarRutina";

const RutinaUsuario = ({
  rutinaSeleccionada,
  rutinaEditable,
  mostrarModalInfo,
  modoRutina,
  onResetearInterfaz,
}) => {
  // Estados locales
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
  const [nombreRutinaEditable, setNombreRutinaEditable] = useState("");

  // Validación para habilitar botón en modo Crear
  const camposValidosCrear = nombreRutinaEditable.trim().length > 0;

  // Carga de usuarios desde backend
  useEffect(() => {
    fetchGeneral({
      url: "http://localhost:8000/apiFtx/usuario/all",
      method: "GET",
      onSuccess: (data) => setUsuarios(data),
    });
  }, []);

  // Inicialización de campos al seleccionar rutina
  useEffect(() => {
    if (rutinaSeleccionada?.nombreRutina) {
      setNombreRutinaEditable(rutinaSeleccionada.nombreRutina);
      setUsuarioSeleccionado(rutinaSeleccionada.nombreUsuario || "");
    }
  }, [rutinaSeleccionada]);

  // Handlers de inputs
  const handleUsuarioChange = (e) => {
    setUsuarioSeleccionado(e.target.value);
  };

  const handleNombreChange = (e) => {
    setNombreRutinaEditable(e.target.value);
  };

  // Validación para habilitar botón en modo Copiar
  const camposModificados = (() => {
    if (!rutinaSeleccionada) return false;
    return (
      nombreRutinaEditable &&
      usuarioSeleccionado &&
      nombreRutinaEditable !== rutinaSeleccionada.nombreRutina &&
      usuarioSeleccionado !== rutinaSeleccionada.nombreUsuario
    );
  })();

  // Guardado en modo Copiar
  const handleGuardarRutinaCopiada = async () => {
    if (!nombreRutinaEditable || !usuarioSeleccionado) {
      mostrarModalInfo("Debes ingresar un nombre y seleccionar un usuario");
      return;
    }

    if (
      nombreRutinaEditable === rutinaSeleccionada.nombreRutina ||
      usuarioSeleccionado === rutinaSeleccionada.nombreUsuario
    ) {
      mostrarModalInfo(
        "Debes cambiar el nombre y seleccionar un nuevo usuario"
      );
      return;
    }

    const rutinaParaGuardar = {
      ...rutinaEditable,
      nombreRutina: nombreRutinaEditable,
      nombreUsuario: usuarioSeleccionado,
      id: null,
    };

    try {
      await guardarRutinaEnBackend(rutinaParaGuardar);
      mostrarModalInfo("Rutina copiada y guardada correctamente");
      onResetearInterfaz();
    } catch (error) {
      mostrarModalInfo("Error al guardar la rutina");
    }
  };

  // Guardado en modo Crear
  const handleGuardarRutinaCreada = async () => {
    if (!nombreRutinaEditable || nombreRutinaEditable.trim().length === 0) {
      mostrarModalInfo("Una rutina no puede guardarse sin nombre");
      return;
    }

    const rutinaParaGuardar = {
      ...rutinaEditable,
      nombreRutina: nombreRutinaEditable,
      nombreUsuario: usuarioSeleccionado,
      id: null,
    };

    try {
      await guardarRutinaEnBackend(rutinaParaGuardar);
      mostrarModalInfo("Rutina creada correctamente");
      onResetearInterfaz();
    } catch (error) {
      mostrarModalInfo("Error al guardar la rutina");
    }
  };

  // Guardado en modo Editar
  const handleGuardarRutinaEditada = async () => {
    if (!nombreRutinaEditable) {
      mostrarModalInfo("Debes ingresar un nombre para la rutina");
      return;
    }

    const rutinaParaGuardar = {
      ...rutinaEditable,
      nombreRutina: nombreRutinaEditable,
      nombreUsuario: rutinaEditable.nombreUsuario,
      id: rutinaEditable.id,
    };

    try {
      await guardarRutinaEnBackend(rutinaParaGuardar);
      mostrarModalInfo("Rutina editada correctamente");
      onResetearInterfaz();
    } catch (error) {
      mostrarModalInfo("Error al guardar la rutina");
    }
  };

  return (
    <div className="rutina-usuario-container">
      {/* Mensaje contextual según modo */}
      {modoRutina === "Copiar" &&
        rutinaSeleccionada?.nombreRutina &&
        rutinaSeleccionada?.nombreUsuario && (
          <div className="mensaje-contextual">
            Estás copiando la rutina{" "}
            <strong>{rutinaSeleccionada.nombreRutina}</strong> de{" "}
            <strong>{rutinaSeleccionada.nombreUsuario}</strong>.
          </div>
        )}

      {modoRutina === "Crear" && (
        <div className="mensaje-contextual">
          Estás creando una nueva rutina. Ingresá un nombre y asignale un
          usuario (opcional).
        </div>
      )}

      {modoRutina === "Editar" && rutinaSeleccionada?.nombreRutina && (
        <div className="mensaje-contextual">
          Estás editando la rutina{" "}
          <strong>{rutinaSeleccionada.nombreRutina}</strong>. Solo podés
          modificar el nombre y la estructura, no el usuario.
        </div>
      )}

      {/* Formulario principal */}
      <div className="rutina-usuario-form-row">
        {/* Campo nombre de rutina */}
        <div className="rutina-usuario-nombre">
          <label>Nombre de Rutina</label>
          <input
            type="text"
            value={nombreRutinaEditable}
            onChange={handleNombreChange}
            placeholder="Nuevo nombre de la rutina"
          />
        </div>

        {/* Selector de usuario */}
        <div className="rutina-usuario-selector">
          <label>Seleccione Usuario</label>
          <select
            value={usuarioSeleccionado}
            onChange={handleUsuarioChange}
            disabled={modoRutina === "Editar"}
          >
            <option value="">{usuarioSeleccionado}</option>
            {usuarios
              .filter((usuario) => usuario.rol === "usuario")
              .map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.datosPersonales?.nombre}{" "}
                  {usuario.datosPersonales?.apellido}
                </option>
              ))}
          </select>
        </div>

        {/* Botón guardar según modo */}
        {modoRutina === "Copiar" && (
          <div className="rutina-usuario-boton">
            <button
              className="btn-guardar-rutina"
              onClick={handleGuardarRutinaCopiada}
              disabled={!camposModificados}
            >
              Guardar rutina copiada
            </button>
          </div>
        )}

        {modoRutina === "Crear" && (
          <div className="rutina-usuario-boton">
            <button
              className="btn-guardar-rutina"
              onClick={handleGuardarRutinaCreada}
            >
              Guardar rutina creada
            </button>
          </div>
        )}

        {modoRutina === "Editar" && (
          <div className="rutina-usuario-boton">
            <button
              className="btn-guardar-rutina"
              onClick={handleGuardarRutinaEditada}
              disabled={!nombreRutinaEditable}
            >
              Guardar rutina editada
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RutinaUsuario;

