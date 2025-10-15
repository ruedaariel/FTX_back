import { useState, useEffect } from "react";
import InicioRutina from "./components/admin/adminRutina/inicioRutina.jsx";

// src/componentsShare/Modal/ModalGlobal.jsx
import { useModal } from "./context/ModalContext.jsx";
import ModalInfoTemporizado from "./components/componentsShare/Modal/ModalInfoTemporizado.jsx";
import { ModalProvider } from "../src/context/ModalContext.jsx";
import ModalGlobal from "./components/componentsShare/Modal/ModalGlobal.jsx";


function App() {
  return (
    <ModalProvider>
      <InicioRutina />
      <ModalGlobal />
    </ModalProvider>
  );
}

export default App;
