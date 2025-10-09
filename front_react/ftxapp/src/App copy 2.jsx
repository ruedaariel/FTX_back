import { useState, useEffect } from "react";

import PantallaClientes from "./components/admin/adminClientes/pantallaClientes/PantallaClientes.jsx";
/* import AdminApp from './components/admin/adminClientes/'
import PanelAdmin from './components/PanelAdmin/panelAdmin.jsx'*/
import HeaderCrud from "./components/componentsShare/header/HeaderCrud.jsx";
// import { BrowserRouter } from "react-router-dom";

import RutinaVisual from "./components/admin/adminRutina/rutinaVisual/rutinaVisual.jsx";
import rutinaData from "./components/admin/adminRutina/rutina.json"; // o desde API
import SelectorRutinas from "./components/admin/adminRutina/SelectorRutina/selectorRutina.jsx";
import RutinaUsuario from "./components/admin/adminRutina/rutinaUsuario/rutinaUsario.jsx";
import GestionRutinas from "./components/admin/adminRutina/gestionRutinas/gestionRutinas.jsx";
import { fetchGeneral } from "./components/componentsShare/utils/fetchGeneral.js";

function App() {
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState(null);
  const [rutinaData, setRutinaData] = useState(null);

  useEffect(() => {
    if (rutinaSeleccionada?.idRutina) {
      fetchGeneral({
        url: `http://localhost:8000/apiFtx/rutina/${rutinaSeleccionada.idRutina}`,
        method: "GET",
        onSuccess: (data) => setRutinaData(data),
      });
    }
  }, [rutinaSeleccionada]);
console.log("Rutina cargada desde backend:", rutinaData);

  return (
    <>
      {/* ReactDOM.createRoot(document.getElementById('root')).render(
      <BrowserRouter>
        <PantallaClientes />
      </BrowserRouter>
      ); */}
      {/* <PanelAdmin /> */}
      <HeaderCrud title="Gestion de Rutinas" />
      {/* <GestionRutinas  /> */}
      <SelectorRutinas onSeleccionarRutina={setRutinaSeleccionada} />
       <RutinaUsuario rutinaSeleccionada={rutinaSeleccionada} />
      {rutinaData && <RutinaVisual rutina={rutinaData} />}

    </>
  );
}

export default App;
