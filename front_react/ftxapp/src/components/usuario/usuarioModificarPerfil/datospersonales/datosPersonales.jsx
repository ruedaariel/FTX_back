import React from 'react';
import { useForm } from 'react-hook-form';
import './datosPersonales.css';

const DatosPersonalesTab = ({ datos, onChange }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: datos
  });

  const onSubmit = (formData) => {
    onChange(formData);
  };

  return (
    <form className="formulario-personale" onSubmit={handleSubmit(onSubmit)}>
  
  <div className="nombre-apellido">
  <div className="campo-form">
    <label>Nombre</label>
    <input {...register("nombre", { required: true })} />
  </div>

  <div className="campo-form">
    <label>Apellido</label>
    <input {...register("apellido", { required: true })} />
  </div>
  </div>

    <div className="mail-telefono">
  <div className="campo-form">
    <label>Email</label>
    <input type="email" {...register("email", { required: true })} />
  </div>

  <div className="campo-form">
    <label>Teléfono</label>
    <input {...register("phone", { required: true })} />
  </div>
  </div>

<div className="nacimiento-genero">
  <div className="campo-form">
    <label>Fecha de nacimiento</label>
    <input type="date" {...register("fNacimiento", { required: true })} />
  </div>

  <div className="campo-form">
    <label>Género</label>
    <select {...register("genero", { required: true })}>
      <option value="mujer">Mujer</option>
      <option value="hombre">Hombre</option>
      <option value="otro">Otro</option>
    </select>
  </div>
  </div>

  <button type="submit" className="btn-guardar-tab">Guardar sección</button>
</form>
  );
};

export default DatosPersonalesTab;
