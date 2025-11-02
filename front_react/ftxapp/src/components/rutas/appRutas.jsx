import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../../pages/public/landingPage/landingPage";
import AdminDashboard from "../../pages/admin/adminDashboard/adminDashboard";
import UsuarioDashboard from "../../pages/usuario/usuarioDashboard/usuarioDashboard";
import InicioRutina from "../../pages/admin/adminRutinas/inicioRutina";
import PantallaClientes from "../../pages/admin/adminClientes/PantallaClientes";
import EnContruccion from "../../pages/public/enContruccion/EnConstruccion";
import { PagosAdmin } from "../../pages/admin/adminPagos";
import Contacto from "../../pages/public/contacto/contacto"
import PaginaEjercicios from "../../pages/admin/adminEjercicios/paginaEjercicios";
import UsuarioRutina from "../../pages/usuario/usuarioRutina/usuarioRutina";
import PerfilUsuario from "../../pages/usuario/usuarioPerfil/PerfilUsuario";
import LoginPage from "../../pages/public/loginPage/LoginPage";

/* import Rutina from "../pages/Rutina";
import Usuarios from "../pages/Usuarios";
import NotFound from "../pages/NotFound";
 */
const AppRutas = () => {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="/contacto" element={<Contacto/>} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/login" element= {<LoginPage/>}/>
      <Route path="/usuario" element={<UsuarioDashboard />} />
      <Route path="/admin/rutinas" element={<InicioRutina />} />
      <Route path="/admin/clientes" element={<PantallaClientes />} />
      <Route path="/admin/pagos" element={<PagosAdmin />} />
      <Route path="/admin/ejercicios" element = {<PaginaEjercicios />}/>
      <Route path="/usuario/rutina" element={<UsuarioRutina />} />
      <Route path="/usuario/perfil" element={<PerfilUsuario />} />
      <Route path="*" element={<EnContruccion />} />

    {/*   <Route path="/rutina" element={<Rutina />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="*" element={<NotFound />} />  */}

    </Routes>
  );
};

export default AppRutas;
