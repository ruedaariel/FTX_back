import React, { useState } from 'react';
import HeaderCrud from '../header/HeaderCrud';
import BarraBusqueda from '../barraBusqueda/BarraBusqueda';
import TablaUsuarios from '../clientes/clientes';
import ModalBusqueda from '../../Modal/modalBusqueda/ModalBusqueda';
import './PantallaClientes.css';

function PantallaClientes() {
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("activo");
  const [mostrarModalBusqueda, setMostrarModalBusqueda] = useState(false);
  const [filtrosAvanzados, setFiltrosAvanzados] = useState({});

  const handleBuscarAvanzado = (criterios) => {
    setFiltrosAvanzados(criterios);
  };

const handleResetFiltro = () => {
    setFiltrosAvanzados({});
    setEstadoSeleccionado("activo");
  };

  return (
    <>
      <HeaderCrud title="Listado Clientes"/>
      <BarraBusqueda
        estadoSeleccionado={estadoSeleccionado}
        onEstadoChange={setEstadoSeleccionado}
        onAbrirBusqueda={() => setMostrarModalBusqueda(true)}
        onResetFiltro={handleResetFiltro}
      />
      <TablaUsuarios
        estadoFiltro={estadoSeleccionado}
        filtrosAvanzados={filtrosAvanzados}
      />
      <ModalBusqueda
        isOpen={mostrarModalBusqueda}
        onClose={() => setMostrarModalBusqueda(false)}
        onBuscar={handleBuscarAvanzado}
      />
    </>
  );
}

export default PantallaClientes;