// front_react/ftxapp/src/components/PagoManualForm/PagoManualForm.jsx
import React, { useState } from 'react';


import './PagoManualForm.css';
import FormField from '../form/formField';
import Button from '../form/button/button';

const PagoManualForm = ({ onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    usuarioId: '',
    monto: '',
    diasAdicionales: '',
    metodoDePago: '',
    estado: 'approved', // Los pagos manuales siempre son aprobados
    fechaPago: new Date().toISOString().slice(0, 16), // datetime-local format
    external_reference: ''
  });

  const [errors, setErrors] = useState({});

  const metodoDePagoOptions = [
    { value: 'EFECTIVO', label: 'Efectivo' },
    { value: 'TRANSFERENCIA', label: 'Transferencia Bancaria' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.usuarioId) {
      newErrors.usuarioId = 'El ID del usuario es requerido';
    } else if (isNaN(formData.usuarioId) || formData.usuarioId <= 0) {
      newErrors.usuarioId = 'El ID del usuario debe ser un número válido';
    }

    if (!formData.monto) {
      newErrors.monto = 'El monto es requerido';
    } else if (isNaN(formData.monto) || parseFloat(formData.monto) <= 0) {
      newErrors.monto = 'El monto debe ser un número positivo';
    }

    if (!formData.diasAdicionales) {
      newErrors.diasAdicionales = 'Los días adicionales son requeridos';
    } else if (isNaN(formData.diasAdicionales) || parseInt(formData.diasAdicionales) <= 0) {
      newErrors.diasAdicionales = 'Los días adicionales deben ser un número positivo';
    }

    if (!formData.metodoDePago) {
      newErrors.metodoDePago = 'El método de pago es requerido';
    }

    if (!formData.fechaPago) {
      newErrors.fechaPago = 'La fecha de pago es requerida';
    }

    if (!formData.external_reference.trim()) {
      newErrors.external_reference = 'La referencia externa es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Formatear datos para envío
      const dataToSend = {
        ...formData,
        usuarioId: parseInt(formData.usuarioId),
        monto: parseFloat(formData.monto),
        diasAdicionales: parseInt(formData.diasAdicionales)
      };
      
      console.log('Datos del formulario:', dataToSend);
      onSubmit(dataToSend);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pago-manual-form">
      <div className="form-grid">
        <FormField
          label="ID del Usuario"
          type="number"
          name="usuarioId"
          value={formData.usuarioId}
          onChange={handleInputChange}
          error={errors.usuarioId}
          placeholder="Ej: 1"
          required
        />

        <FormField
          label="Monto"
          type="number"
          name="monto"
          value={formData.monto}
          onChange={handleInputChange}
          error={errors.monto}
          placeholder="Ej: 2500.00"
          required
        />

        <FormField
          label="Días Adicionales"
          type="number"
          name="diasAdicionales"
          value={formData.diasAdicionales}
          onChange={handleInputChange}
          error={errors.diasAdicionales}
          placeholder="Ej: 30"
          required
        />

        <FormField
          label="Método de Pago"
          type="select"
          name="metodoDePago"
          value={formData.metodoDePago}
          onChange={handleInputChange}
          error={errors.metodoDePago}
          options={metodoDePagoOptions}
          placeholder="Seleccionar método..."
          required
        />

        <FormField
          label="Fecha de Pago"
          type="datetime-local"
          name="fechaPago"
          value={formData.fechaPago}
          onChange={handleInputChange}
          error={errors.fechaPago}
          required
        />

        <FormField
          label="Referencia Externa"
          type="text"
          name="external_reference"
          value={formData.external_reference}
          onChange={handleInputChange}
          error={errors.external_reference}
          placeholder="Ej: pago-manual-001"
          required
        />
      </div>

      <div className="form-actions">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
        >
          Cargar Pago
        </Button>
      </div>
    </form>
  );
};

export default PagoManualForm;