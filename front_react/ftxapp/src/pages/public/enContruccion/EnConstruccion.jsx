import React from "react";
import "./style_en_construccion.css"; // Asegurate de importar los estilos
import "./colores.css";    // Ruta relativa según tu estructura

const EnConstruccion = () => {
  return (
    <div className="container">
      <header>
        <img
          src="../../../assets/Recursos/IconosLogos/logo.png" // Asegurate que esté en public/assets/
          alt="Logo FTX"
          className="logo"
        />
      </header>

      <main>
        <h1>Estamos trabajando en esta sección</h1>
        <p>
          Esta página aún está en desarrollo. Estamos mejorando la experiencia
          para que pronto puedas acceder a todas las funcionalidades.
        </p>

        <div className="progress-bar-container">
          <div className="progress-bar"></div>
        </div>

        <div className="percentage">75% completado</div>

        <div className="contact-info">
          <p>¿Tenés dudas o sugerencias? Escribinos:</p>
          <div className="social-icons">
            <a href="mailto:contacto@ftx.com.ar" title="Email">
              <img src="/assets/icons/mail.svg" alt="Email" />
            </a>
            <a href="https://www.instagram.com/ftx" target="_blank" rel="noopener noreferrer" title="Instagram">
              <img src="/assets/icons/instagram.svg" alt="Instagram" />
            </a>
            <a href="https://www.facebook.com/ftx" target="_blank" rel="noopener noreferrer" title="Facebook">
              <img src="/assets/icons/facebook.svg" alt="Facebook" />
            </a>
          </div>
        </div>
      </main>

      <footer>
        <p>FTX &copy; 2025 — Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default EnConstruccion;
