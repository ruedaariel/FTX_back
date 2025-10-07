import React from 'react'
import logo from '../../../assets/recursos/IconosLogos/logoSinLetrasNaranja.png'
import './HeaderCrud.css'
import '../../cadminclientes/colores.css'
import { useNavigate } from 'react-router-dom';



function HeaderCrud({ title = "Panel" }) {
  const navegar = useNavigate();

  const volver = () => {
    navegar(-1); // Volver a la página anterior
  };

  return (
    <nav className="top-menu">
      <a href="../home_administrador.html" className="logo">
        <img src={logo} alt="logo FTX" title={title} />
      </a>
      <h1 className="menu-title">{title}</h1>
      <button className="close-app" onClick={volver}>✖</button>
    </nav>
  );
}

export default HeaderCrud













