import React, { useState } from "react";
import HeaderCrud from "./HeaderCrud";
import SelectorRutinas from "./SelectorRutinas";
import RutinaUsuario from "./RutinaUsuario";

function GestionRutinas() {
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState(null);

  return (
    <>
      
      <SelectorRutinas onSeleccionarRutina={setRutinaSeleccionada} />
      <RutinaUsuario rutinaSeleccionada={rutinaSeleccionada} />
    </>
  );
}

export default GestionRutinas;
