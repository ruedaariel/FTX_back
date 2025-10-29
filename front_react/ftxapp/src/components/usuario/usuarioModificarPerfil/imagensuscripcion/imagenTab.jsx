import React from 'react';
import '../perfilDatos.css';

const ImagenTab = ({ imagenPerfil, plan, onChange }) => {
  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file.name); // o subir el archivo si tenés lógica de backend
    }
  };

  return (
    <div className="imagen-tab">
      <div className="imagen-perfil-container">
        <img src={`/assets/${imagenPerfil}`} alt="Perfil" className="imagen-perfil" />
        <input type="file" accept=".jpg,.png" onChange={handleImagenChange} />
        <p className="formato-imagen">Formatos: JPG, PNG. Máx: 5MB</p>
      </div>

      <div className="plan-info">
        <h4>{plan.nombrePlan}</h4>
        <p>Acceso completo a todas las funciones</p>
        <p className="precio-plan">${plan.precio} por mes</p>
        <button className="btn-cambiar-plan">Cambiar plan</button>
        <button className="btn-ver-facturacion">Ver facturación</button>
      </div>
    </div>
  );
};

export default ImagenTab;
