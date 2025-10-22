import { createContext, useContext, useState } from "react";
import ModalInfoTemporizado from "../components/componentsShare/Modal/ModalInfoTemporizado.jsx";
import ModalError from "../components/componentsShare/Modal/modalError/ModalError.jsx";

/**
 * Contexto para mostrar modales informativos, de éxito o de error.
 * 
 *  ¿Cómo usar `showModal` en cualquier componente?
 * 
 * 1. Envolvé tu aplicación con <ModalProvider> en App.jsx:
 * 
 *    <ModalProvider>
 *      <App />
 *    </ModalProvider>
 * 
 * 2. Usá el hook `useModal()` donde necesites mostrar un mensaje:
 * 
 *    import { useModal } from "./context/ModalContext";
 * 
 *    const { showModal } = useModal();
 * 
 *    showModal("Mensaje a mostrar", "info" | "success" | "error", duraciónEnMs, persistente);
 * 
 *    Ejemplo:
 *    showModal("Guardado exitoso", "success", 3000);
 *    showModal("Error al guardar", "error", 0, true); // persistente
 * 
 * 3. El modal se cierra automáticamente si no es persistente, o manualmente con `closeModal()`.
 */

// Crear el contexto
const ModalContext = createContext();

// Hook personalizado para acceder al contexto
export const useModal = () => useContext(ModalContext);

// Proveedor que gestiona el estado del modal y lo renderiza
export const ModalProvider = ({ children }) => {
  // Estado del modal
  const [visible, setVisible] = useState(false);       // Si el modal está visible
  const [message, setMessage] = useState("");           // Mensaje a mostrar
  const [duration, setDuration] = useState(3000);       // Duración en ms (solo si no es persistente)
  const [type, setType] = useState("info");             // Tipo de modal: "info", "success", "error"
  const [persistente, setPersistente] = useState(false); // Si el modal debe permanecer abierto

  /**
   * Muestra el modal con contenido personalizado.
   * 
   * @param {string} msg - Mensaje a mostrar
   * @param {string} variant - Tipo de modal: "info", "success", "error"
   * @param {number} ms - Duración en milisegundos (solo si no es persistente)
   * @param {boolean} persist - Si el modal debe permanecer abierto hasta que se cierre manualmente
   */
  const showModal = (msg, variant = "info", ms = 3000, persist = false) => {
    setMessage(msg);
    setType(variant);
    setPersistente(persist);
    setDuration(ms);
    setVisible(true);

    if (!persist) {
      setTimeout(() => setVisible(false), ms);
    }
  };

  /**
   * Cierra el modal manualmente.
   */
  const closeModal = () => {
    setVisible(false);
  };

  /**
   * Renderiza el modal según el tipo y persistencia.
   */
  const renderModal = () => {
    if (!visible) return null;

    // Modal de error persistente
    if (type === "error" && persistente) {
      return (
        <ModalError
          isOpen={visible}
          title="Error"
          message={message}
          onClose={closeModal}
          borderClass="modal-error-border"
        />
      );
    }

    // Modal informativo o de éxito temporizado
    return (
      <ModalInfoTemporizado
        isOpen={visible}
        message={message}
        title={type === "info" ? "Info" : "Success"}
        type={type}
        borderClass={
          type === "info" ? "modal-info-border" : "modal-success-border"
        }
        onClose={closeModal}
        autoCloseMs={duration}
      />
    );
  };

  // Proveer funciones y renderizar el modal
  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {renderModal()}
    </ModalContext.Provider>
  );
};
