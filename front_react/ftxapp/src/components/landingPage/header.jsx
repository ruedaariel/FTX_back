
import logo from '../../assets/Recursos/IconosLogos/logoSinLetrasNaranja.png'

function Header() {

    return (

        <header>
        
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark" id="mainNavbar">
            <div className="container">
                <a className="navbar-brand" href="index.html">
                    <img src={logo}alt="logo FTX" title="Página principal" /> FTX </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#inicio">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#entrenador">Entrenador</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#beneficios">Beneficios</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#planes">Planes</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#testimonios">Testimonios</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#faq">FAQ</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="./contacto/contacto.html">Contacto</a>
                        </li>
                        <li className="nav-item">

                            <a className="nav-link btn btn-resaltado btn-sm"
                                href="./loginregister/login_basico.html">Login/Registro</a>



                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    );
}

export default Header;