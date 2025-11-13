import React, { useState, useEffect } from "react";


import './usuarioDashboard.css';
import DashboardGrid from '../../../components/dashboardGrid/dashboardGrid';
import DashboardCard from '../../../components/dashboardCard/dashboardCard';
import { useNavigate } from 'react-router-dom';
import HeaderCrud from '../../../components/componentsShare/header/HeaderCrud';
import { IoPeopleSharp } from "react-icons/io5";
import { useModal } from "../../../context/ModalContext";
import { fetchGeneral } from "../../../components/componentsShare/utils/fetchGeneral";
import { getToken } from "../../../auth/token";
import { decodeToken } from "../../../auth/jwt";


const UsuarioDashboard = () => {

  const navigate = useNavigate();
  const [tokenUsuario, setTokenUsuario] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const { showModal } = useModal();

  function isTokenExpired(token) {
  if (!token?.exp) return true;
  const now = Math.floor(Date.now() / 1000); // tiempo actual en segundos
  return token.exp < now;
}

  // useEffect(() => {
  //   const token = getToken("ftxAccessToken");
  //   if (token) {
  //     const datos = decodeToken(token);
  //     setTokenUsuario(datos);
  //     console.log("tokenUsuario",tokenUsuario);
  //   }
  // }, []);

  useEffect(() => {
  const token = getToken("ftxAccessToken");
  if (token) {
    const datos = decodeToken(token);

    if (isTokenExpired(datos)) {
      sessionStorage.removeItem("ftxAccessToken");
      console.log("Sesión expirada token vencido");
      showModal("Tu sesión ha expirado. Inicia sesión nuevamente.", "info", 3000);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      return;
    }

    setTokenUsuario(datos);
  } else {
    console.log("Sesión expirada no hay token");
      showModal("Tu sesión ha expirado.Inicia sesión nuevamente.", "info", 3000);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    navigate("/login");
  }
}, []);

  
  

  // busco el usuario en backend pero antes espero a que se haya caragado el token
        
  useEffect(() => {
  if (tokenUsuario?.sub) {
    fetchGeneral({
      url: `http://localhost:8000/apiFtx/usuario/${tokenUsuario.sub}`,
      method: "GET",
      onSuccess: (data) => {
        setUsuario(data);
      },
      showModal,
    });
  }
}, [tokenUsuario]);

    
  console.log("usuario",usuario);



  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Cerrando sesión...');
    // Aquí podrías redirigir al login o limpiar el localStorage
  };

  const Navigate = useNavigate();

  const dashboardItems = [
    {
      id: 'rutina',
      icon: '🏋️',
      title: 'Rutina',
      description: 'Mira tus rutinas de entranamiento',
      onClick: () => navigate("/usuario/rutina", { state: { usuario } })
    },
    {
      id: 'clientes',
      icon: <IoPeopleSharp />,
      title: 'Perfil',
      description: 'Modifica Tus datos de Perfil',
      onClick: () => navigate("/usuario/perfil", { state: { usuario } })
    },
    {
      //icon: '📈' → más enfocado en evolución o rendimiento
      id: 'Estadisticas',
      icon: '📈',
      title: 'Estadisticas',
      description: 'Mira tus avances con las rutinas.',
      onClick: () => navigate("/usuario/estadistica", { state: { usuario } })
    },
    {
      
      id: 'Pagos',
      icon: '💳',
      title: 'Pagos',
      description: 'Gestiona tus pagos',
      onClick: () => Navigate("/usuario/pagos")
    },
    
    {
      
      id: 'Planes',
      icon: '📋',
      title: 'Planes',
      description: 'Quires ver los planes?',
      onClick: () => Navigate("/admin/planes")
    }
  ];





  return (

    <div className="container">
      <HeaderCrud title="Perfil de Usuario" widthPercent={100} />
    <div className="admin-dashboard">
      {/* <HeaderAdmin 
        logo="FTX"
        title="Panel usuario"
        onLogout={handleLogout}
        logoutText="Cerrar Sesión"
      /> */}
      
      <main className="dashboard-main">
        <DashboardGrid columns={3} gap="2rem">
          {dashboardItems.map((item) => (
            <DashboardCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              description={item.description}
              onClick={item.onClick}
              variant="default"
            />
          ))}
        </DashboardGrid>
      </main>
    </div>
    </div>
  );
};

export default UsuarioDashboard;