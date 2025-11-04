import '../../../pages/usuario/usuarioPerfil/perfilUsuario.css';

const Tabs = ({ activeTab, onTabChange }) => (
  <div className="perfil-tabs">
    <button
      className={activeTab === 'imagen' ? 'tab-activa' : ''}
      onClick={() => onTabChange('imagen')}
    >
      Imagen y Suscripción
    </button>
    <button
      className={activeTab === 'personales' ? 'tab-activa' : ''}
      onClick={() => onTabChange('personales')}
    >
      Datos Personales
    </button>
    <button
      className={activeTab === 'fisicos' ? 'tab-activa' : ''}
      onClick={() => onTabChange('fisicos')}
    >
      Datos Físicos
    </button>
  </div>
);

export default Tabs;
