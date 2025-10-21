<<<<<<< HEAD
import { useState, useEffect } from "react";


// src/componentsShare/Modal/ModalGlobal.jsx

import { ModalProvider } from "./context/ModalContext.jsx";
import ModalGlobal from "./components/componentsShare/Modal/ModalGlobal.jsx";
import AppRutas from "./components/rutas/appRutas.jsx";
import { BrowserRouter } from "react-router-dom";
import "./styles/style.css";
import "./styles/colores.css";

function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <AppRutas />
      </BrowserRouter>

      {/* <InicioRutina /> */}
      <ModalGlobal />
    </ModalProvider>
  );
=======


import HeaderCrud from './components/componentsShare/header/HeaderCrud.jsx'
import CrudEjercicioBasico from './components/admin/adminEjercicio/CrudEjercicioBasico.jsx'
import { ModalProvider } from "../src/context/ModalContext.jsx";
import ModalGlobal from "./components/componentsShare/Modal/ModalGlobal.jsx";

function App() {
  return (
    <>

      {/* <Header />
      <Carousel />
      <Porqueelegirnos />
      <Tutrainer />
      <Planes />
      <Testimonios />
      <Faq /> */}
      {/* <Footer /> */}
      {/* <LoginApi /> */}
      <ModalProvider>
       <HeaderCrud title="Gestion de Ejercicios"></HeaderCrud>
        <CrudEjercicioBasico></CrudEjercicioBasico>
        <ModalGlobal></ModalGlobal>
      </ModalProvider>



    </>
  )
>>>>>>> 787067e90252d34ce5ad2c37bfc75c5fb9cebd77
}

export default App;
