// ContenedorCards.jsx
import React from 'react';
import CardUsuario from '../cardUsuario/CardUsuario';
import ModalEditarUsuario from '../../../componentsShare/Modal/modalEditarUsuario/ModalEditarUsuario';
import ModalDecision from '../../../componentsShare/Modal/ModalDecision';

function ContenedorCards({
  usuariosFiltrados,
  activeTab,
  setActiveTab,
  handleEditar,
  handleEliminarClick,
  usuarioEditando,
  setUsuarioEditando,
  handleGuardarCambios,
  mostrarDecision,
  setMostrarDecision,
  usuarioAEliminar,
  handleDecision,
  mostrarErrorAcceso,
  setMostrarErrorAcceso,
  obtenerUsuarios,
}) {

   
  return (
    <div className="contenedor-cards">
      {usuariosFiltrados
        .filter((usuario) => usuario.rol === 'usuario')
        .map((usuario) => (
          <CardUsuario
            key={usuario.id}
            usuario={usuario}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleEditar={handleEditar}
            handleEliminarClick={handleEliminarClick}
          />
        ))}

      {usuarioEditando && (
        <ModalEditarUsuario
          usuario={usuarioEditando}
          onClose={() => setUsuarioEditando(null)}
          onGuardar={handleGuardarCambios}
        />
      )}

      {mostrarDecision && (
        <ModalDecision
          isOpen={mostrarDecision}
          title="Confirmar eliminación"
          message={`¿Querés eliminar a ${usuarioAEliminar.email}? todos sus datos de rutina seran eliminados`}
          borderClass="modal-error-border"
          onClose={() => setMostrarDecision(false)}
          onDecision={handleDecision}
        />
      )}

      {mostrarErrorAcceso && (
        <ModalDecision
          isOpen={mostrarErrorAcceso}
          title="Error de conexión"
          message="No se pudo acceder a los datos de usuarios. ¿Querés reintentar?"
          borderClass="modal-error-border"
          onClose={() => setMostrarErrorAcceso(false)}
          onDecision={(respuesta) => {
            setMostrarErrorAcceso(false);
            if (respuesta) obtenerUsuarios();
          }}
        />
      )}
    </div>
  );
}

export default ContenedorCards;
