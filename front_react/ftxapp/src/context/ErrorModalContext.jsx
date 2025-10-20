import React, { createContext, useContext, useState } from "react";
import ModalError from "../componentsShare/Modal/ModalError.jsx";

const ErrorModalContext = createContext();

export const useErrorModal = () => useContext(ErrorModalContext);

export const ErrorModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    message: "",
    borderClass: "",
  });

  const showErrorModal = (title, message, borderClass = "") => {
    setModalState({ isOpen: true, title, message, borderClass });
  };

  const closeErrorModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ErrorModalContext.Provider value={{ showErrorModal, closeErrorModal }}>
      {children}
      <ModalError
        isOpen={modalState.isOpen}
        title={modalState.title}
        message={modalState.message}
        borderClass={modalState.borderClass}
        onClose={closeErrorModal}
      />
    </ErrorModalContext.Provider>
  );
};
