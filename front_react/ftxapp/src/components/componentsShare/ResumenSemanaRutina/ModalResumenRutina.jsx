import React from "react";
import "./ModalResumenRutina.css";
import ResumenSemanasRutina from "./ResumenSemanasRutina";

const ModalResumenRutina = ({ isOpen, onClose, rutina,onConfirmar }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-resumen-overlay">
      <div className="modal-resumen-content">
        <h2>Resumen de la Rutina</h2>
        <ResumenSemanasRutina rutina={rutina} />
        <button className="btn-cerrar-modal" onClick={onClose}>
          Cerrar
        </button>
        <button className="btn-confirmar-modal" onClick={onConfirmar}>
  Confirmar y Guardar
</button>

      </div>
    </div>
  );
};

export default ModalResumenRutina;
