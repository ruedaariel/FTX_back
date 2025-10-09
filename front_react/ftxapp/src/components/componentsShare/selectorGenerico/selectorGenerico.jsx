import React from "react";
import "./SelectorGenerico.css";
import { useEffect } from "react";
const SelectorGenerico = ({
  opciones = [],
  valueKey = "id",
  labelKey = "nombre",
  valorSeleccionado,
  onSeleccionar,
  labelTexto = "Seleccione una opción",
  disabled = false,
}) => {
  const handleChange = (e) => {
    const valor = e.target.value;
    const objetoSeleccionado = opciones.find(
      (item) => String(item[valueKey]) === valor
    );
    if (onSeleccionar) onSeleccionar(objetoSeleccionado);
  };
  
  const valorSelectInterno = valorSeleccionado ? valorSeleccionado[valueKey] : "";

useEffect(() => {
  console.log("Valor seleccionado cambió:", valorSeleccionado);
}, [valorSeleccionado]);



useEffect(() => {
  console.log("Valor seleccionado cambió:", valorSeleccionado);
}, [valorSeleccionado]);

  return (
    <div className="selector-generico-header">
      <div className="selector-generico-wrapper">
        <span className="selector-generico-label">{labelTexto}</span>
        <select
          id="selector-generico"
          value={valorSelectInterno}
          onChange={handleChange}
          disabled={disabled}
        >
          <option value="">Elige una opción...</option>
          {opciones.map((item) => (
            <option key={item[valueKey]?? item.id} value={item[valueKey]}>
              {item[labelKey]}
            </option>
          ))}
        </select>
        
      </div>
    </div>
  );
};

export default SelectorGenerico;