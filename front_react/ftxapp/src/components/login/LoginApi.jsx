import React, { useState } from 'react';
import './LoginBasico.css';
import Logo from '../../assets/Recursos/IconosLogos/logoSinLetrasNaranja.png';
import video from '../../assets/Recursos/Videos/competenciaNeuquen.mp4';


// POST /login  
//{
//  "email": "usuario@ejemplo.com",
//  "password": "Contraseña123"
//}

// Respuesta exitosa para usuario
// Respuesta exitosa para admin
// Respuesta fallida    
//{
//  "success": true,
//  "role": "usuario" // o "admin"
//}

// Respuesta fallida con mensaje de error
//{
//  "success": false,
//  "message": "Credenciales inválidas"
//}

const LoginBasico = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    borderClass: ''
  });

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    let isValid = true;

    setErrorEmail('');
    setErrorPassword('');

    if (!emailRegex.test(email)) {
      setErrorEmail('Por favor, introduce un email válido.');
      isValid = false;
    }

    if (!passwordRegex.test(password)) {
      setErrorPassword('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.');
      isValid = false;
    }

    if (password.length === 0) {
      setErrorPassword('La contraseña no puede estar vacía.');
      isValid = false;
    }

    if (!isValid) {
      setModal({
        isOpen: true,
        title: 'Error de Validación',
        message: 'Usuario o contraseña incorrectos.',
        borderClass: 'modal-error-border'
      });
      return;
    }

    // 🔗 Llamada a la API
    try {
      const response = await fetch('http://localhost:8000/apiFtx/usuario/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
            
      if (response.ok && data && Object.keys(data).length > 0) {

        
        console.log(data);

        // Redirigir según el rol
        if (data.rol === 'usuario') {
          window.location.href = '../Usuario/home_usuario.html';
        } else if (data.rol === 'admin') {
          window.location.href = '../Administrador/home_administrador.html';
        } else {
          setModal({
            isOpen: true,
            title: 'Error de Rol',
            message: 'Rol de usuario desconocido.',
            borderClass: 'modal-error-border'
          });
        }
      } else {
        setModal({
          isOpen: true,
          title: 'Error de Acceso',
          message: data.message || 'Credenciales inválidas.',
          borderClass: 'modal-error-border'
        });
      }
    } catch (error) {
      setModal({
        isOpen: true,
        title: 'Error de Conexión',
        message: 'No se pudo conectar con el servidor.',
        borderClass: 'modal-error-border'
      });
    }
  };

  const closeModal = () => {
    setModal({ isOpen: false, title: '', message: '', borderClass: '' });
  };

  return (
    <div className="login-body">
      <header className="login-header">
        <nav className="navbar navbar-dark">
          <a className="navbar-brand" href="../index.html">
            <img src={Logo} alt="logo FTX" />
            FTX
          </a>
        </nav>
      </header>

      <div className="login-container">
        <div className="video-section">
          <video autoPlay muted loop playsInline>
            <source src={video} type="video/mp4" />
            Tu navegador no soporta la etiqueta de video.
          </video>
        </div>
        <div className="login-section login-basico">
          <h1>Bienvenido</h1>
          <p>Ingresa tus credenciales</p>
          <form id="form-login" onSubmit={handleLogin}>
            <div className="input-icon-validate">
              <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-erroring">{errorEmail}</div>

            <div className="input-icon-validate">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className={`icon-validate toggle-password fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                onClick={() => setShowPassword(!showPassword)}
              ></span>
            </div>
            <div className="input-erroring">{errorPassword}</div>

            <p className="enlace">
              ¿Olvidaste el password? <a href="reseteo_password.html">Ir a resetear</a>
            </p>

            <button id="iniciar" type="submit">Iniciar Sesión</button>
          </form>
          <p className="enlace">
            ¿No tienes cuenta? <a href="login_suscripcion.html">Regístrate</a>
          </p>
        </div>
      </div>

      {modal.isOpen && (
        <div id="genericModal" className="modal">
          <div className={`modal-content ${modal.borderClass}`}>
            
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h1>{modal.title}</h1>
            <p>{modal.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginBasico;
