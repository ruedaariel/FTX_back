import { createContext, useContext, useState, useEffect } from "react";
import ModalInfoTemporizado from "../components/componentsShare/Modal/ModalInfoTemporizado.jsx";
import ModalError from "../components/componentsShare/Modal/modalError/ModalError.jsx";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(3000);
  const [type, setType] = useState("info"); // "info", "error", "success"
  const [persistente, setPersistente] = useState(false);

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

  const closeModal = () => {
    setVisible(false);
  };

  const renderModal = () => {
    if (!visible) return null;

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

  return (
    <ModalContext.Provider
      value={{ showModal, closeModal }}
    >
      {children}
      {renderModal()}

      
    </ModalContext.Provider>
  );
};
