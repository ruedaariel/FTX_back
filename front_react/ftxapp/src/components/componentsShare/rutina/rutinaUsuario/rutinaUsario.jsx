import React, { useEffect, useState } from "react";
import "./RutinaUsuario.css";
import { fetchGeneral } from "../../cadminclientes/fetchGeneral";

const RutinaUsuario = ({ rutinaSeleccionada }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
  const [nombreRutinaEditable, setNombreRutinaEditable] = useState("");



  useEffect(() => {
    fetchGeneral({
      url: "http://localhost:8000/apiFtx/usuario/all",
      method: "GET",
      onSuccess: (data) => setUsuarios(data),
    });
  }, []);

  useEffect(() => {
    if (rutinaSeleccionada?.nombreRutina) {
      setNombreRutinaEditable(rutinaSeleccionada.nombreRutina);
    }
  }, [rutinaSeleccionada]);

  const handleUsuarioChange = (e) => {
    setUsuarioSeleccionado(e.target.value);
  };

  const handleNombreChange = (e) => {
    setNombreRutinaEditable(e.target.value);
  };

  //console.log("Usuarios cargados:", usuarios);
  console.log("usuarios --->",usuarios.map((usuario) => (usuario.datosPersonales?.nombre)));
              
               


  return (
    <div className="rutina-usuario-container">
      <div className="rutina-usuario-visual">
        {/* Campo editable de rutina */}
        <div className="rutina-usuario-nombre">
          <label>Nombre de Rutina</label>
          <input
            type="text"
            value={nombreRutinaEditable}
            onChange={handleNombreChange}
            placeholder="Nombre de la rutina"
          />
        </div>

        {/* Selector de usuario */}
        <div className="rutina-usuario-selector">
          <label>Seleccione Usuario</label>
          <select value={usuarioSeleccionado} onChange={handleUsuarioChange}>
            <option value="">Elige un usuario...</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.datosPersonales?.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default RutinaUsuario;

