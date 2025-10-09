import React, { useEffect, useState } from "react";
import "./RutinaUsuario.css";
import { fetchGeneral } from "./../../../componentsShare/utils/fetchGeneral";

// Componente que permite editar el nombre de la rutina y seleccionar el usuario asociado
const RutinaUsuario = ({ rutinaSeleccionada }) => {
  // Estado para almacenar la lista de usuarios disponibles
  const [usuarios, setUsuarios] = useState([]);

  // Estado para el usuario actualmente seleccionado
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

  // Estado para el nombre editable de la rutina
  const [nombreRutinaEditable, setNombreRutinaEditable] = useState("");

  // Al montar el componente, se obtienen todos los usuarios desde el backend
  useEffect(() => {
    fetchGeneral({
      url: "http://localhost:8000/apiFtx/usuario/all",
      method: "GET",
      onSuccess: (data) => setUsuarios(data),
    });
  }, []);

  // Cuando se recibe una rutina seleccionada, se actualizan los campos editables
  useEffect(() => {
    if (rutinaSeleccionada?.nombreRutina) {
      setNombreRutinaEditable(rutinaSeleccionada.nombreRutina);
      setUsuarioSeleccionado(rutinaSeleccionada.nombreUsuario || "");
    }
  }, [rutinaSeleccionada]);

  // Maneja el cambio en el selector de usuario
  const handleUsuarioChange = (e) => {
    setUsuarioSeleccionado(e.target.value);
  };

  // Maneja el cambio en el campo de nombre de rutina
  const handleNombreChange = (e) => {
    setNombreRutinaEditable(e.target.value);
  };

  // Log de depuración para verificar los nombres de los usuarios cargados
  /* console.log(
    "usuarios --->",
    usuarios.map((usuario) => usuario.datosPersonales?.nombre)
  ); */

  return (
    <div className="rutina-usuario-container">
      <div className="rutina-usuario-visual">
        {/* Campo editable para el nombre de la rutina */}
        <div className="rutina-usuario-nombre">
          <label>Nombre de Rutina</label>
          <input
            type="text"
            value={nombreRutinaEditable}
            onChange={handleNombreChange}
            placeholder="Nombre de la rutina"
          />
        </div>

        {/* Selector de usuario asociado a la rutina */}
        <div className="rutina-usuario-selector">
          <label>Seleccione Usuario</label>
          <select value={usuarioSeleccionado} onChange={handleUsuarioChange}>
            {/* Opción inicial que muestra el usuario actual si existe */}
            <option value="">{usuarioSeleccionado}</option>

            {/* Opciones filtradas por rol "usuario" */}
            {usuarios
              .filter((usuario) => usuario.rol === "usuario")
              .map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.datosPersonales?.nombre} {usuario.datosPersonales?.apellido}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default RutinaUsuario;

