
import React, { useState, useEffect } from 'react';
import './crud_clientes.css';

const ClienteModal = ({ modo, cliente, onClose, onSave, onDelete }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (cliente) {
            setFormData(cliente);
        } else {
            setFormData({
                DNI: '',
                nombre: '',
                apellido: '',
                correo: '',
                telefono: '',
                plan: '',
                estado: ''
            });
        }
    }, [cliente]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleDelete = () => {
        onDelete(formData.DNI);
    };

    const getTitle = () => {
        switch (modo) {
            case 'agregar': return 'Nuevo Cliente';
            case 'editar': return 'Editar Cliente';
            case 'buscar': return 'Buscar Clientes';
            default: return '';
        }
    };

    const getButtonText = () => {
        switch (modo) {
            case 'agregar': return 'Guardar';
            case 'editar': return 'Guardar Cambios';
            case 'buscar': return 'Buscar';
            default: return '';
        }
    };

    return (
        <div className="modal" style={{ display: 'flex' }}>
            <div className="contenido-modal">
                <div className="encabezado-modal">
                    <h2 id="tituloModal">{getTitle()}</h2>
                    <span className="close-btn" onClick={onClose}>&times;</span>
                </div>
                <form id="clienteForm" className="modal-form" onSubmit={handleSubmit}>
                    <input type="hidden" id="clienteId" />
                    <div className="form-group">
                        <label htmlFor="nro">DNI:</label>
                        <input type="number" id="nro" name="DNI" required={modo !== 'buscar'} min="1" value={formData.DNI || ''} onChange={handleChange} disabled={modo === 'editar'} />
                        <div id="nro-error" className="mensaje-error">{errors.DNI}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre" name="nombre" required={modo !== 'buscar'} value={formData.nombre || ''} onChange={handleChange} />
                        <div id="nombre-error" className="mensaje-error">{errors.nombre}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido">Apellido:</label>
                        <input type="text" id="apellido" name="apellido" required={modo !== 'buscar'} value={formData.apellido || ''} onChange={handleChange} />
                        <div id="apellido-error" className="mensaje-error">{errors.apellido}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="correo">Correo:</label>
                        <input type="email" id="correo" name="correo" required={modo !== 'buscar'} value={formData.correo || ''} onChange={handleChange} />
                        <div id="correo-error" className="mensaje-error">{errors.correo}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono:</label>
                        <input type="text" id="telefono" name="telefono" value={formData.telefono || ''} onChange={handleChange} />
                        <div id="telefono-error" className="mensaje-error">{errors.telefono}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="plan">Plan:</label>
                        <select id="plan" name="plan" required={modo !== 'buscar'} value={formData.plan || ''} onChange={handleChange}>
                            <option value="">Seleccione un plan</option>
                            <option value="Premium">Premium</option>
                            <option value="Básico">Básico</option>
                            <option value="Intermedio">Intermedio</option>
                        </select>
                        <div id="plan-error" className="mensaje-error">{errors.plan}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="estado">Estado:</label>
                        <select id="estado" name="estado" required={modo !== 'buscar'} value={formData.estado || ''} onChange={handleChange}>
                            <option value="">Seleccione un estado</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                        <div id="estado-error" className="mensaje-error">{errors.estado}</div>
                    </div>
                    <div className="btns-modal">
                        <button type="submit" id="btnPpalModal">{getButtonText()}</button>
                        {modo === 'editar' && <button type="button" id="btnEliminarCliente" onClick={handleDelete}>Eliminar</button>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClienteModal;
