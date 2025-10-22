import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../../pages/public/landingPage/landingPage";
import AdminDashboard from "../../pages/admin/adminDashboard/adminDashboard";
import UsuarioDashboard from "../../pages/usuario/usuarioDashboard/usuarioDashboard";
import InicioRutina from "../../pages/admin/adminRutinas/inicioRutina";
import PantallaClientes from "../../pages/admin/adminClientes/PantallaClientes";
import EnContruccion from "../../pages/public/enContruccion/EnConstruccion";
import { PagosAdmin } from "../../pages/admin/adminPagos";


/* import Rutina from "../pages/Rutina";
import Usuarios from "../pages/Usuarios";
import NotFound from "../pages/NotFound";
 */
const AppRutas = () => {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/usuario" element={<UsuarioDashboard />} />
      <Route path="/admin/rutinas" element={<InicioRutina />} />
      <Route path="/admin/clientes" element={<PantallaClientes />} />
      <Route path="/admin/pagos" element={<PagosAdmin />} />
      <Route path="*" element={<EnContruccion />} />

    {/*   <Route path="/rutina" element={<Rutina />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="*" element={<NotFound />} />  */}

    </Routes>
  );
};

export default AppRutas;
