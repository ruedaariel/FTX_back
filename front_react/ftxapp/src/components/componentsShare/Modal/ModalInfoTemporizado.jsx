import React, { useEffect, useState } from "react";
import './modalError/modalError.css'; // Usá tus estilos existentes

const ModalInfoTemporizado = ({
  isOpen,
  title,
  message,
  borderClass = "",
  onClose,
  autoCloseMs = null, // ⏱ tiempo en milisegundos
}) => {
  const [progreso, setProgreso] = useState(100);

  useEffect(() => {
    if (isOpen && autoCloseMs) {
      const intervalMs = 100;
      const pasos = autoCloseMs / intervalMs;
      let contador = 0;

      const intervalo = setInterval(() => {
        contador++;
        setProgreso(100 - (contador / pasos) * 100);
      }, intervalMs);

      const timer = setTimeout(() => {
        clearInterval(intervalo);
        onClose();
      }, autoCloseMs);

      return () => {
        clearTimeout(timer);
        clearInterval(intervalo);
        setProgreso(100);
      };
    }
  }, [isOpen, autoCloseMs, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className={`modal-content ${borderClass}`}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h1>{title}</h1>
        <p>{message}</p>
        {autoCloseMs && (
          <div className="barra-progreso">
            <div
              className="barra-progreso-fill"
              style={{ width: `${progreso}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalInfoTemporizado;
