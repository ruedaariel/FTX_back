
import { useState, useEffect } from 'react';
import HeaderCrud from '../../componentsShare/header/HeaderCrud';
import CrudEjercicioBasico from './CrudEjercicioBasico';
import SelectorEjercicio from './selectorEjercicio';

const PaginaCrudEjercicio = () => {

 const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);
  const [ejercicioData, setEjercicioData] = useState(null);
  
  useEffect(() => {
  if (ejercicioSeleccionado?.idEjercicioBasico) {
    fetchGeneral({
      url: `http://localhost:8000/apiFtx/ejbasico/${ejercicioSeleccionado.idEjercicioBasico}`,
      method: "GET",
      onSuccess: (data) => setRutinaData(data),
    });
  }
}, [ejercicioSeleccionado]);


  return (
    <>
      <HeaderCrud title='Gestion de Ejercicios'  />
      <SelectorEjercicio onSeleccionarEjercicio={setEjercicioSeleccionado} />
     
      <CrudEjercicioBasico unEjercicio={ejercicioData} />
      </>
  )
}

export default PaginaCrudEjercicio