import React from 'react';
import '../Modal/modalError/ModalError.css'; // Usá tus estilos existentes

const ModalDecision = ({
  isOpen,
  title,
  message,
  borderClass = '',
  onClose,
  onDecision // función que recibe true o false
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className={`modal-content ${borderClass}`}>
        {/* Botón para cerrar el modal */}
        <span className="close-button" onClick={() => onDecision(false)}>&times;</span>

        {/* Título y mensaje */}
        <h1>{title}</h1>
        <p>{message}</p>

        {/* Botones de decisión */}
        <div className="modal-buttons">
          <button className="btn-confirmar" onClick={() => onDecision(true)}>Sí</button>
          <button className="btn-cancelar" onClick={() => onDecision(false)}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDecision;
