import React from 'react';


import './AdminDashboard.css';
import DashboardGrid from '../../components/dashboardGrid/dashboardGrid';
import DashboardCard from '../../components/dashboardCard/dashboardCard';
import HeaderAdmin from '../../components/headerAdmin/headerAdmin';

const AdminDashboard = () => {
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
      description: 'Editar Planes de entrenamiento',
      onClick: () => console.log('Navegando a Rutinas...')
    },
    {
      id: 'clientes',
      icon: '👥',
      title: 'Listado de Clientes',
      description: 'lista los clientes con su historial de pago',
      onClick: () => console.log('Navegando a Clientes...')
    },
    {
      id: 'precios',
      icon: '💰',
      title: 'Lista de Precios',
      description: 'Modificar precio de los planes vigentes.',
      onClick: () => console.log('Navegando a Precios...')
    },
    {
      id: 'ejercicios',
      icon: '🏋️',
      title: 'Ejercicios',
      description: 'Editar ejercicios que luego se usan en las Rutinas',
      onClick: () => console.log('Navegando a Ejercicios...')
    },
    {
      id: 'planes',
      icon: '📋',
      title: 'Planes',
      description: 'Editar planes de entrenamiento',
      onClick: () => console.log('Navegando a Planes...')
    },
    {
      id: 'pagos',
      icon: '💳',
      title: 'Pagos',
      description: 'Gestionar pagos y métodos de pago de los clientes',
      onClick: () => console.log('Navegando a Pagos...')
    }
  ];

  return (
    <div className="admin-dashboard">
      <HeaderAdmin 
        logo="FTX"
        title="Panel Administrador"
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

export default AdminDashboard;