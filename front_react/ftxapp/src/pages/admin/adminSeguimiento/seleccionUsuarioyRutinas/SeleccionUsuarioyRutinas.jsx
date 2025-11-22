import React, { useEffect, useState } from "react";
import "./SeleccionUsuariosyRutinas.css";
import { fetchGeneral } from "../../../../components/componentsShare/utils/fetchGeneral";
import { useModal } from "../../../../context/ModalContext";

const SeguimientoRutinas = ({ onUsuarioChange, onRutinaChange }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [rutinasUsuario, setRutinasUsuario] = useState([]);
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState(null);
  const { showModal } = useModal();

  // Cargar usuarios al montar
  useEffect(() => {
    fetchGeneral({
      url: "http://localhost:8000/apiFtx/usuario/all",
      method: "GET",
      onSuccess: (data) => setUsuarios(data),
    });
  }, []);

  // Cargar rutinas del usuario seleccionado
//   console.log("Buscando rutinas para usuario:", usuarioSeleccionado?.id);
  useEffect(() => {
    if (!usuarioSeleccionado) return;
    
   
    fetchGeneral({
      url: `http://localhost:8000/apiFtx/usuario/rutinas/${usuarioSeleccionado.id}`,
      method: "GET",
      onSuccess: (data) => {
        setRutinasUsuario(data);
        // console.log("Rutinas recibidas:", data);
      },
      showModal,
    });
  }, [usuarioSeleccionado]);

  //   console.log("Usuario Seleccionado:", usuarioSeleccionado);
  //   console.log("Usuario id:", usuarioSeleccionado.rol);

  // Avisar al padre cuando cambia usuario
  useEffect(() => {
    if (onUsuarioChange) {
      onUsuarioChange(usuarioSeleccionado);
    }
  }, [usuarioSeleccionado, onUsuarioChange]);

  // Avisar al padre cuando cambia rutina
  useEffect(() => {
    if (onRutinaChange) {
      onRutinaChange(rutinaSeleccionada);
    }
  }, [rutinaSeleccionada, onRutinaChange]);

  return (
    <div className=" seleccion-usuario-rutina">
          {/* Select de usuarios */}
      <div className="form-group-seleccion-usuario-rutina">
        
        <label>Seleccionar Usuario:</label>
        <select
          id="usuarioSelect"
          value={usuarioSeleccionado ? usuarioSeleccionado.id : ""}
          onChange={(e) => {
            const userObj = usuarios.find(
              (u) => String(u.id) === e.target.value
            );
            setUsuarioSeleccionado(userObj || null);
            setRutinaSeleccionada(null); // reset rutina al cambiar usuario
          }}
        >
          <option value="">-- Seleccione un usuario --</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.datosPersonales?.nombre}{" "}
              {usuario.datosPersonales?.apellido}
            </option>
          ))}
        </select>
      </div>

      {/* Select de rutinas */}
      {usuarioSeleccionado && (
        <div className="form-group-seleccion-usuario-rutina">
          <label >Seleccionar Rutina:</label>
          <select
            id="rutinaSelect"
            value={rutinaSeleccionada ? rutinaSeleccionada.idRutina : ""}
            onChange={(e) => {
              const rutinaObj = rutinasUsuario.find(
                (r) => String(r.idRutina) === e.target.value
              );
              setRutinaSeleccionada(rutinaObj || null);
            }}
          >
            <option value="">-- Seleccione una rutina --</option>
            {rutinasUsuario.map((rutina) => (
              <option key={rutina.idRutina} value={rutina.idRutina}>
                {rutina.nombreRutina}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default SeguimientoRutinas;
