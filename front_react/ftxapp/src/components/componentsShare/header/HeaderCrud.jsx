import React from 'react'
import logo from '../../../assets/recursos/IconosLogos/logoSinLetrasNaranja.png'
import './HeaderCrud.css'
//import '../../../colores.css'
import { Link, useNavigate } from 'react-router-dom';



function HeaderCrud({ title = "Panel", widthPercent = 90 }) {
  const navigate = useNavigate();

  const volver = () => { 
     // intenta volver en el historial; si no hay historial, ir al dashboard
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/'); // Ver como ir a las home page del admin o del user 
    }
  }

const computedWidth =
    typeof widthPercent === 'number' ? `${widthPercent}%` : String(widthPercent); //% del width del componente

  return (
    <nav className="top-menu" style={{ width: computedWidth }}>
      <a href="../home_administrador.html" className="logo">
        <img src={logo} alt="logo FTX" title={title} />
      </a>
      <h1 className="menu-title">{title}</h1>
      <button className="close-app" onClick={volver}>✖</button>
    </nav>
  );
}

export default HeaderCrud













