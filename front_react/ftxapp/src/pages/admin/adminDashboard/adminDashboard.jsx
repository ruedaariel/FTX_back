import React, {useEffect, useState} from 'react';


import './AdminDashboard.css';
import DashboardGrid from '../../../components/dashboardGrid/dashboardGrid';
import DashboardCard from '../../../components/dashboardCard/dashboardCard';
import HeaderAdmin from '../../../components/headerAdmin/headerAdmin';
import { useNavigate } from 'react-router-dom';
import { getToken } from "../../../auth/token";
import { decodeToken } from "../../../auth/jwt";
import { useModal } from "../../../context/ModalContext";
import HeaderCrud from '../../../components/componentsShare/header/HeaderCrud';


const AdminDashboard = () => {
  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Cerrando sesión...');
    // Aquí podrías redirigir al login o limpiar el localStorage
  };

  const navigate = useNavigate();
  const [tokenUsuario, setTokenUsuario] = useState(null);
  const { showModal } = useModal();


    function isTokenExpired(token) {
  if (!token?.exp) return true;
  const now = Math.floor(Date.now() / 1000); // tiempo actual en segundos
  return token.exp < now;
}

  useEffect(() => {
    const token = getToken("ftxAccessToken");
    if (token) {
      const datos = decodeToken(token);
  
      if (isTokenExpired(datos)) {
        sessionStorage.removeItem("ftxAccessToken");
        console.log("Sesión expirada, token vencido");
        showModal("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.", "error", 3000);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
        return;
      }
  
      setTokenUsuario(datos);
    } else {
      console.log("Sesión expirada no hay token");
      showModal("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.", "info", 3000);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      navigate("/login");
    }
  }, []);
  
  
  const dashboardItems = [
    {
      id: 'rutina',
      icon: '✏️',
      title: 'Rutina',
      description: 'Editar Planes de entrenamiento',
      onClick: () => navigate("/admin/rutinas")
    },
    {
      id: 'clientes',
      icon: '👥',
      title: 'Listado de Clientes',
      description: 'lista los clientes con su historial de pago',
      onClick: () => navigate("/admin/clientes")
    },
    // {
    //   id: 'precios',
    //   icon: '💰',
    //   title: 'Lista de Precios',
    //   description: 'Modificar precio de los planes vigentes.',
    //   onClick: () => navigate("/admin/precios")
    // },
    {
      id: 'ejercicios',
      icon: '🏋️',
      title: 'Ejercicios',
      description: 'Editar ejercicios que luego se usan en las Rutinas',
      onClick: () => navigate("/admin/ejercicios")
    },
    {
      id: 'planes',
      icon: '📋',
      title: 'Planes',
      description: 'Editar planes de entrenamiento',
      onClick: () => navigate("/admin/planes")
    },
    {
      id: 'pagos',
      icon: '💳',
      title: 'Pagos',
      description: 'Gestionar pagos y métodos de pago de los clientes',
      onClick: () => navigate("/admin/pagos")
    }
  ];

  return (

    <div className="container">
      <HeaderCrud title=" Gestion Admnistrador" widthPercent={100} MostrarCerrarSesion={true} />

    <div className="admin-dashboard">
      {/* <HeaderAdmin 
        logo="FTX"
        title="Panel Administrador"
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

export default AdminDashboard;