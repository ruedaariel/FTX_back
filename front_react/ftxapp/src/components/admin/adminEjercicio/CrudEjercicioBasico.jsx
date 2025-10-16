import React, { useEffect, useState } from "react";
import { fetchGeneral } from "../../componentsShare/utils/fetchGeneral";
import '../../../colores.css';
import './validacion.css';
import './crud_ejercicio.css';
import SelectorEjercicio from "./selectorEjercicio";
import LOGO_PLACEHOLDER from '../../../assets/Recursos/IconosLogos/logoblanco.png';
import ModalInfoTemporizado from "../../componentsShare/Modal/ModalInfoTemporizado";
import { EJERCICIO_VACIO } from './utils/ejercicio_vacio';
import { useEjercicioForm } from "./useEjercicioForm";
import { getEmbedUrl } from "./utils/formatoVideo";




const CrudEjercicioBasico = () => {
    //ejercicio seleccionado (Crear -> null, Editar -> ejrcicio del backend)
    const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);
    //Crear o Editar
    const [modoEjercicio, setModoEjercicio] = useState("Crear");
    //Todos los ejercicios que vienen del backend (EjercicioBasicoEntity[])
    const [ejercicios, setEjercicios] = useState([]); //ejercicios 
    //maneja delay
   // const [loading, setLoading] = useState(false);
    //interviene en el manejo de error
    const [error, setError] = useState(null);
    //para previsualizar el video
    const [showVideo, setShowVideo] = useState(false);
    //para recargar o no los ejercicios del backend
    const [reload, setReload] = useState(false);

    const {
        ejercicioData,      // Datos del formulario
        errores,            // Errores de validación
        loading,          // Estado de carga 
        setLoading,
        handleInputChange,  // on/Change
        handleBlur,         // onBlur
        handleSubmit,       // onSubmit
    } = useEjercicioForm(modoEjercicio, ejercicioSeleccionado,setReload, setEjercicioSeleccionado);

    const fetchEjercicios = () => {
        fetchGeneral({
            url: "http://localhost:8000/apiFtx/ejbasico/all",
            method: "GET",
            setLoading,
            setError,
            onSuccess: (data) => {
                setEjercicios(data);
                setReload(false);
            }
        });
    }

    //cuando se carga la pagina, se carga el arreglo de ejercicios desde el BE
    useEffect(() => {
        fetchEjercicios();
    }, []);

    //se vuelve a cargar los Ejercicios cada vez que se graba
    useEffect(() => {
        if (reload) {
            fetchEjercicios();
        }

    }, [reload]);

    //si cambia la seleccion o el modo, no muestra el video
    useEffect(() => {
        setShowVideo(false);
    }, [ejercicioSeleccionado, modoEjercicio]);

    const handleSeleccionarModo = (nuevoModo) => {
        setModoEjercicio(nuevoModo);
        if (nuevoModo === "Crear") {
            setEjercicioSeleccionado(null);
        }
    }

    // Manejador que selecciona un ejercicio por su ID (si es necesario) o por el objeto
    const handleSeleccionarEjercicio = (ejercicio) => {
        if (ejercicio && ejercicio.idEjercicioBasico) {
            setEjercicioSeleccionado(ejercicio);
            setModoEjercicio("Editar");
        } else {
            setEjercicioSeleccionado(null);
            setModoEjercicio("Crear");
            //VER SI MANDO ERROR O SI CARGO EJERCICIOVACIO
        }

    }

const handleDelete = async () => {
  if (!ejercicioSeleccionado || !ejercicioSeleccionado.idEjercicioBasico) return;

  //aca va el modal
  const confirmDelete = window.confirm(`¿Eliminar "${ejercicioSeleccionado.nombreEjercicio}"? Esta acción no se puede deshacer.`);
  if (!confirmDelete) return;

  const url = `http://localhost:8000/apiFtx/ejbasico/delete/${ejercicioSeleccionado.idEjercicioBasico}`;

  try {
    await fetchGeneral({
      url,
      method: 'DELETE',
      setLoading,     // usa el setLoading devuelto por el hook
      setError,
      onSuccess: () => {
        // Limpiar la selección y forzar recarga
        setEjercicioSeleccionado(null);
        setModoEjercicio('Crear'); // opcional
        setReload(true);
      }
    });
  } catch (err) {
    //modal
    console.error("Error eliminando ejercicio:", err);
    
  }
};

    return (
        <div className="container">
            <SelectorEjercicio
                modoEjercicio={modoEjercicio}
                ejercicios={ejercicios}
                ejercicioSeleccionado={ejercicioSeleccionado}
                onSeleccionarEjercicio={handleSeleccionarEjercicio}
                onCambiarModo={handleSeleccionarModo}
                error={error}
            ></SelectorEjercicio>

            <form id="ejercicioForm" onSubmit={handleSubmit}>
                <div className="form-container">
                    {/*columna izq - contiene la informacion basica del ej*/}
                    <div className="columna-izq">

                        <div className="form-group">
                            <label htmlFor="nombreEjercicio">Nombre Ejercicio:</label>
                            <div className="input-icon-validate">
                                <input type="text" id="nombreEjercicio" name="nombreEjercicio" className={`form-control ${errores.nombreEjercicio ? 'is-invalid' : ''}`}
                                    required placeholder="El nombre debe ser unico, por ejemplo, sentadilla sumo"
                                    value={ejercicioData?.nombreEjercicio || ''} onChange={handleInputChange} onBlur={handleBlur} />
                                <span className="icon-validate" data-icon="nombreEjercicio"></span>
                            </div>
                            {errores.nombreEjercicio && (
                                <div className="input-warning text-danger"   >
                                    {errores.nombreEjercicio}
                                </div>
                            )}

                        </div>



                        <div className="form-group">
                            <label htmlFor="observaciones">Observaciones:</label>
                            <textarea id="observaciones" name="observaciones"
                                className={`form-control ${errores.observaciones ? 'is-invalid' : ''}`}
                                value={ejercicioData.observaciones || ''} onChange={handleInputChange} onBlur={handleBlur}></textarea>
                            {errores.observaciones && (
                                <div className="input-warning text-danger" style={{ display: "block" }}>
                                    {errores.observaciones}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="imagenLink">Link Imagen: </label>
                            <input type="file" id="imagenLink" name="imagenLink"
                                className={`form-control ${errores.imagenFile ? 'is-invalid' : ''}`}
                                accept="image/*" onChange={handleInputChange} />
                            {errores.imagenFile && (
                                <div className="input-warning text-danger" >
                                    {errores.imagenFile}
                                </div>
                            )}

                        </div>

                        <div className="form-group">
                            <label htmlFor="videoLink">Link Video:
                                {ejercicioData.videoLink && !showVideo && (
                                    <span className="etiqueta-carga"
                                        onClick={() => { setShowVideo(true); }}>
                                        Previsualizar video
                                    </span>
                                )}

                            </label>
                            <input type="url" id="videoLink" name="videoLink"
                                className={`form-control ${errores.videoLink ? 'is-invalid' : ''}`}
                                value={ejercicioData.videoLink || ''}
                                onChange={handleInputChange}
                                onBlur={handleBlur} />
                            {errores.videoLink && (
                                <div className="input-warning text-danger" style={{ display: "block" }}>
                                    {errores.videoLink}
                                </div>
                            )} </div>

                        <div className="botones">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Guardando...' : 'Guardar'}
                            </button>
                            {/* El botón eliminar solo se muestra en modo Editar */}
                            {modoEjercicio === "Editar" && (
                                <button type="button" className="btn btn-danger" disabled={loading} onClick={handleDelete}> 
                                    Eliminar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </form >
            { /*columna derecha: vista previa de imagen y video*/}
            <div className="columna-der">
                {/* El valor de src ahora proviene de ejercicioData.imagenLink del hook */}
                <div className="imagen-preview">
                    <h4>Vista previa de la imagen</h4>
                    <img id="imagenPreview" src={ejercicioData.imagenPreviewUrl ? ejercicioData.imagenPreviewUrl : LOGO_PLACEHOLDER}
                        alt="Vista previa de la imagen" style={{ maxWidth: '100%', maxHeight: '150px' }} />
                </div>
                <div className="video-preview">
                    <h4>Vista previa del video</h4>
                    {ejercicioData.videoLink && showVideo ? (
                        <iframe id="videoPreview" src={getEmbedUrl(ejercicioData.videoLink)} className="video-iframe-preview"
                            allowFullScreen title="Vista previa del video del ejercicio">
                        </iframe>
                    ) : (ejercicioData.videoLink ? (
                        <div className="video-placeholder-mensaje video-iframe-preview">
                            El video no se ha cargado. Presione **"Previsualizar video"** para cargarlo.
                        </div>
                    ) : (
                        // 3. Si no hay link, no mostramos nada del video
                        <div className="video-placeholder-mensaje video-iframe-preview">
                            No hay un enlace de video ingresado.
                        </div>
                    )
                    )}


                </div>
            </div>
        </div>




    )
}

export default CrudEjercicioBasico;