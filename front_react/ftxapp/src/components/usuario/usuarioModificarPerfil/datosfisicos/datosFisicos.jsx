import React from 'react';
import { useForm } from 'react-hook-form';
import '../perfilDatos.css';


const DatosFisicosTab = ({ datos, onChange }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: datos
  });

  const onSubmit = (formData) => {
    onChange(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="formulario-tab">
      <div className="campo-form">
        <label>Actividad diaria</label>
        <input {...register("actividadDiaria", { required: true })} />
      </div>

      <div className="campo-form">
        <label>Peso (kg)</label>
        <input type="number" step="0.1" {...register("peso", { required: true })} />
      </div>

      <div className="campo-form">
        <label>Estatura (cm)</label>
        <input type="number" {...register("estatura", { required: true })} />
      </div>

      <div className="campo-form">
        <label>Metas</label>
        <input {...register("metas", { required: true })} />
      </div>

      <div className="campo-form">
        <label>Observaciones</label>
        <textarea {...register("observaciones")} />
      </div>

      <button type="submit" className="btn-guardar-tab">Guardar sección</button>
    </form>
  );
};

export default DatosFisicosTab;
