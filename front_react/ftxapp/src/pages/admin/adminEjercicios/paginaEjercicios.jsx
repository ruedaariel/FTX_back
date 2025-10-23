import React from 'react'
import HeaderCrud from '../../../components/componentsShare/header/HeaderCrud.jsx';
import CrudEjercicioBasico from '../../../components/admin/adminEjercicio/CrudEjercicioBasico.jsx';


const PaginaEjercicios = () => {
    return (
        <>
            <HeaderCrud title="Ejercicios Básicos" />
            <CrudEjercicioBasico/>

        </>
    )
}

export default PaginaEjercicios