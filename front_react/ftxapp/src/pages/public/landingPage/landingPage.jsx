import { useState, useEffect } from "react";


// src/componentsShare/Modal/ModalGlobal.jsx

import { ModalProvider } from "../../../context/ModalContext.jsx";
import ModalGlobal from "../../../components/componentsShare/Modal/ModalGlobal.jsx";
import Header from "../../../components/landingPage/header.jsx"
import Carousel from "../../../components/landingPage/carousel.jsx"
import PorqueElegirnos from "../../../components/landingPage/porquelegirnos.jsx"
import TuTrainer from "../../../components/landingPage/tutrainner.jsx"
import Planes from "../../../components/landingPage/planes.jsx"
import Testimonios from "../../../components/landingPage/testimonios.jsx"
import Faq from "../../../components/landingPage/faq.jsx"
import Footer from "../../../components/landingPage/footer.jsx"
import './landingPage.css'
import EnConstruccion from "../enContruccion/EnConstruccion.jsx";

function landingPage() {
  return (
    <ModalProvider>
      <Header />
       <Carousel />
     <PorqueElegirnos />
       <TuTrainer />
      <Planes />
     {/* <Testimonios />
      <Faq />
      <Footer /> */}
      <ModalGlobal />
    </ModalProvider>
  );
}

export default landingPage;

