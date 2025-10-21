import React from 'react';


import './usuarioDashboard.css';
import DashboardGrid from '../../../components/dashboardGrid/dashboardGrid';
import DashboardCard from '../../../components/dashboardCard/dashboardCard';
import HeaderAdmin from '../../../components/headerAdmin/headerAdmin';

const UsuarioDashboard = () => {
  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Cerrando sesión...');
    // Aquí podrías redirigir al login o limpiar el localStorage
  };

  const dashboardItems = [
    {
      id: 'rutina',
      icon: '✏️',
      title: 'Rutina',
      description: 'Mira tus rutinas de entranamiento',
      onClick: () => console.log('Navegando a Rutinas...')
    },
    {
      id: 'clientes',
      icon: '👥',
      title: 'Perfil',
      description: 'Modifica Tus datos de Perfil',
      onClick: () => console.log('Navegando a Clientes...')
    },
    {
      id: 'Estadisticas',
      icon: '💰',
      title: 'Estadisticas',
      description: 'Mira tus avances con las rutinas.',
      onClick: () => console.log('Navegando a Precios...')
    }
    
  ];

  return (
    <div className="admin-dashboard">
      <HeaderAdmin 
        logo="FTX"
        title="Panel usuario"
        onLogout={handleLogout}
        logoutText="Cerrar Sesión"
      />
      
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
  );
};

export default UsuarioDashboard;