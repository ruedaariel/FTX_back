import React, { useState, useEffect } from 'react';
import './perfilUsuario.css';

import Tabs from '../../../components/usuario/usuarioModificarPerfil/Tabs';
import ImagenTab from '../../../components/usuario/usuarioModificarPerfil/imagensuscripcion/imagenTab';
import DatosPersonalesTab from '../../../components/usuario/usuarioModificarPerfil/datospersonales/datosPersonales';
import DatosFisicosTab from '../../../components/usuario/usuarioModificarPerfil/datosfisicos/datosFisicos';
import  obtenerUsuarioMock  from './obtenerUsuarioMock'; // Asegurate de tener esta función

function PaginaPerfil() {
  const [usuario, setUsuario] = useState(null);

  useEffect(function () {
    const datos = obtenerUsuarioMock();
    setUsuario(datos);
  }, []);

  if (!usuario) {
    return <p>Cargando perfil...</p>;
  }

  return <PerfilUsuario usuario={usuario} />;
}

function PerfilUsuario({ usuario }) {
  const [activeTab, setActiveTab] = useState('imagen');
  const [datosEditados, setDatosEditados] = useState(usuario);

  function actualizarSeccion(seccion, nuevosDatos) {
    const copia = Object.assign({}, datosEditados);
    copia[seccion] = Object.assign({}, datosEditados[seccion], nuevosDatos);
    setDatosEditados(copia);
  }

  function handleGuardarCambios() {
    console.log('Perfil actualizado:', datosEditados);
    // Aquí iría la lógica para enviar al backend
  }

  return (
    <div className="perfil-usuario-container">
      <div className="perfil-usuario-header">
        <div className="perfil-tabs">
          <button
            className={activeTab === 'imagen' ? 'tab-activa' : ''}
            onClick={() => setActiveTab('imagen')}
          >
            Imagen y Suscripción
          </button>
          <button
            className={activeTab === 'personales' ? 'tab-activa' : ''}
            onClick={() => setActiveTab('personales')}
          >
            Datos Personales
          </button>
          <button
            className={activeTab === 'fisicos' ? 'tab-activa' : ''}
            onClick={() => setActiveTab('fisicos')}
          >
            Datos Físicos
          </button>
        </div>

        <button className="btn-guardar-cambios" onClick={handleGuardarCambios}>
          Guardar cambios
        </button>
      </div>

      <div className="perfil-tab-contenido">
        {activeTab === 'imagen' && (
          <ImagenTab
            imagenPerfil={datosEditados.datosPersonales.imagenPerfil}
            plan={datosEditados.datosPersonales.plan}
            onChange={function (nuevaImagen) {
              actualizarSeccion('datosPersonales', { imagenPerfil: nuevaImagen });
            }}
          />
        )}

        {activeTab === 'personales' && (
          <DatosPersonalesTab
            datos={datosEditados.datosPersonales}
            onChange={function (nuevosDatos) {
              actualizarSeccion('datosPersonales', nuevosDatos);
            }}
          />
        )}

        {activeTab === 'fisicos' && (
          <DatosFisicosTab
            datos={datosEditados.datosFisicos}
            onChange={function (nuevosDatos) {
              actualizarSeccion('datosFisicos', nuevosDatos);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default PaginaPerfil;
