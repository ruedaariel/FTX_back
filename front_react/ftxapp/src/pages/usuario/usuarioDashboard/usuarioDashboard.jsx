import React from 'react';


import './usuarioDashboard.css';
import DashboardGrid from '../../../components/dashboardGrid/dashboardGrid';
import DashboardCard from '../../../components/dashboardCard/dashboardCard';
import HeaderAdmin from '../../../components/headerAdmin/headerAdmin';
import { useNavigate } from 'react-router-dom';
import HeaderCrud from '../../../components/componentsShare/header/HeaderCrud';
import { IoPeopleSharp } from "react-icons/io5";




const UsuarioDashboard = () => {
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
      onClick: () => Navigate("/usuario/rutina")
    },
    {
      id: 'clientes',
      icon: <IoPeopleSharp />,
      title: 'Perfil',
      description: 'Modifica Tus datos de Perfil',
      onClick: () => Navigate("/usuario/perfil")
    },
    {
      //icon: '📈' → más enfocado en evolución o rendimiento
      id: 'Estadisticas',
      icon: '📈',
      title: 'Estadisticas',
      description: 'Mira tus avances con las rutinas.',
      onClick: () => Navigate("/usuario/estadistica")
    },
    {
      //icon: '📈' → más enfocado en evolución o rendimiento
      id: 'Pagos',
      icon: '💳',
      title: 'Pagos',
      description: 'Gestiona tus pagos',
      onClick: () => Navigate("/usuario/pagos")
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