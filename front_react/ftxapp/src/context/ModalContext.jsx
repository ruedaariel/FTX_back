// src/context/ModalContext.js
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(3000);
  const [type, setType] = useState("info"); // "info", "error", "success"

  const showModal = (msg, variant = "info", ms = 3000) => {
    setMessage(msg);
    setDuration(ms);
    setVisible(true);
    setTimeout(() => setVisible(false), ms);
     setType(variant);
  };

  return (
    <ModalContext.Provider value={{ visible, message, duration, type, showModal }}>
      {children}
    </ModalContext.Provider>
  );
};
