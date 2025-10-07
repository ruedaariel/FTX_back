
import React, { useState, useEffect } from 'react';
import './crud_clientes.css';
import ClienteModal from './ClienteModal';

const initialClientes = [
    { DNI: 12345678, nombre: "Juan", apellido: "Pérez", correo: "juan.perez@example.com", telefono: "1122334455", plan: "Premium", estado: "Activo" },
    { DNI: 39848773, nombre: "María", apellido: "Gómez", correo: "maria.gomez@example.com", telefono: "1133445566", plan: "Básico", estado: "Inactivo" },
    { DNI: 37255346, nombre: "Carlos", apellido: "Rodríguez", correo: "carlos.rodriguez@example.com", telefono: "1144556677", plan: "Intermedio", estado: "Activo" }
];

const CrudClientes = () => {
    const [clientes, setClientes] = useState(initialClientes);
    const [filteredClientes, setFilteredClientes] = useState(initialClientes);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('agregar'); // agregar, editar, buscar
    const [selectedCliente, setSelectedCliente] = useState(null);

    const handleOpenModal = (mode, cliente = null) => {
        setModalMode(mode);
        setSelectedCliente(cliente);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCliente(null);
    };

    const handleSave = (clienteData) => {
        if (modalMode === 'agregar') {
            setClientes(prev => [...prev, clienteData]);
        } else if (modalMode === 'editar') {
            setClientes(prev => prev.map(c => c.DNI === clienteData.DNI ? clienteData : c));
        } else if (modalMode === 'buscar') {
            const { DNI, nombre, apellido, correo, telefono, plan, estado } = clienteData;
            const filtered = clientes.filter(c => {
                return (DNI ? c.DNI.toString().includes(DNI) : true) &&
                       (nombre ? c.nombre.toLowerCase().includes(nombre.toLowerCase()) : true) &&
                       (apellido ? c.apellido.toLowerCase().includes(apellido.toLowerCase()) : true) &&
                       (correo ? c.correo.toLowerCase().includes(correo.toLowerCase()) : true) &&
                       (telefono ? c.telefono.toLowerCase().includes(telefono.toLowerCase()) : true) &&
                       (plan ? c.plan === plan : true) &&
                       (estado ? c.estado === estado : true);
            });
            setFilteredClientes(filtered);
        }
        handleCloseModal();
    };

    const handleDelete = (dni) => {
        setClientes(prev => prev.filter(c => c.DNI !== dni));
        handleCloseModal();
    };

    useEffect(() => {
        setFilteredClientes(clientes);
    }, [clientes]);

    return (
        <>
            <header>
                <nav className="top-menu">
                    <a href="../home_administrador.html" className="logo">
                        <img src="../../Recursos/IconosLogos/logoSinLetrasNaranja.png" title="Ir a Home (mi aplicación)" alt="Logo FTX" />
                    </a>
                    <h1 className="menu-title">Clientes</h1>
                    <button className="close-app" onClick={() => window.location.href = '../home_administrador.html'}>✖</button>
                </nav>
            </header>

            <main className="container">
                <div className="seccion-busqueda">
                    <button id="btnDeBusqueda" onClick={() => handleOpenModal('buscar')}>Buscar/Filtrar</button>
                    <button id="btnResetFiltro" onClick={() => setFilteredClientes(clientes)}>Borrar Filtro</button>
                    <button id="btnNuevoCliente" onClick={() => handleOpenModal('agregar')}>Agregar Cliente</button>
                </div>

                <div className="lista-cli-mobile" id="listaClienteMobile">
                    {filteredClientes.map(cliente => (
                        <div className="card-cliente" key={cliente.DNI}>
                            <h3>{cliente.nombre} {cliente.apellido} (#{cliente.DNI})</h3>
                            <p><strong>Correo:</strong> {cliente.correo}</p>
                            <p><strong>Teléfono:</strong> {cliente.telefono || 'N/A'}</p>
                            <p><strong>Plan:</strong> {cliente.plan}</p>
                            <p><strong>Estado:</strong> {cliente.estado}</p>
                            <button className="actions-icon" onClick={() => handleOpenModal('editar', cliente)} title="Editar Cliente">
                                <i className="fas fa-ellipsis-v"></i>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="lista-cli-desktop" id="listaClienteDesktop">
                    <table className="tabla-clientes">
                        <thead>
                            <tr>
                                <th>DNI</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                                <th>Plan</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="cuerpoTablaClientes">
                            {filteredClientes.map(cliente => (
                                <tr key={cliente.DNI}>
                                    <td>{cliente.DNI}</td>
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.apellido}</td>
                                    <td>{cliente.correo}</td>
                                    <td>{cliente.telefono || 'N/A'}</td>
                                    <td>{cliente.plan}</td>
                                    <td>{cliente.estado}</td>
                                    <td className="celda-botones">
                                        <button onClick={() => handleOpenModal('editar', cliente)}>Editar</button>
                                        <button className="delete-btn" onClick={() => handleDelete(cliente.DNI)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {modalOpen && <ClienteModal modo={modalMode} cliente={selectedCliente} onClose={handleCloseModal} onSave={handleSave} onDelete={handleDelete} />}

                <div id="mensaje" className="mensaje"></div>
            </main>
        </>
    );
};

export default CrudClientes;
