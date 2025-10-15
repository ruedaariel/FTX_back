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




const CrudEjercicioBasico = () => {

    const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);
    const [modoEjercicio, setModoEjercicio] = useState("Crear");
    const [ejercicios, setEjercicios] = useState([]); //ejercicios que vienen del backend

    const [loading, setLoading] = useState(false); //maneja delay
    const [error, setError] = useState(null);

    const {
        ejercicioData,      // Datos del formulario
        errores,            // Errores de validación
        isLoading,          // Estado de carga (usado en botones)
        handleInputChange,  // on/Change
        handleBlur,         // onBlur
        handleSubmit,       // onSubmit
    } = useEjercicioForm(modoEjercicio, ejercicioSeleccionado);

    useEffect(() => {
        fetchGeneral({
            url: "http://localhost:8000/apiFtx/ejbasico/all",
            method: "GET",
            setLoading,
            setError,
            onSuccess: (data) => setEjercicios(data),
        });
    }, []);

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


    return (
        <div className="container">
            <SelectorEjercicio
                modoEjercicio={modoEjercicio}
                ejercicios={ejercicios}
                ejercicioSeleccionado={ejercicioSeleccionado}
                onSeleccionarEjercicio={handleSeleccionarEjercicio}
                onCambiarModo={handleSeleccionarModo}
                loading={loading}
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
                                    value={ejercicioData.nombreEjercicio || ''} onChange={handleInputChange} onBlur={handleBlur} />
                                <span className="icon-validate" data-icon="nombreEjercicio"></span>
                            </div>
                            <div className="input-warning text-danger" style={{ display: "none" }}  >
                                {errores.nombreEjercicio}
                            </div>
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
                            <input type="file" id="imagenLink" name="imagenLink" className={`form-control ${errores.imagenLink ? 'is-invalid' : ''}`}
                                accept="image/*" onChange={handleInputChange} />
                            {errores.imagenLink && (
                                <div className="input-warning text-danger" style={{ display: "block" }}>
                                    {errores.imagenLink}
                                </div>
                            )}

                        </div>

                        <div className="form-group">
                            <label htmlFor="videoLink">Link Video:
                                <span className="etiqueta-carga"
                                    onClick={() => { /* Lógica de previsualización */ }}>
                                    Previsualizar video
                                </span>
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
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? 'Guardando...' : 'Guardar'}
                            </button>
                            {/* El botón eliminar solo se muestra en modo Editar */}
                            {modoEjercicio === "Editar" && (
                                <button type="button" className="btn btn-danger" disabled={isLoading}>
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
                    <img id="imagenPreview" src={ejercicioData.imagenLink ? ejercicioData.imagenLink : LOGO_PLACEHOLDER}
                        alt="Vista previa de la imagen" style={{ maxWidth: '100%', maxHeight: '150px' }} />
                </div>
                <div className="video-preview">
                    <h4>Vista previa del video</h4>
                    <iframe id="videoPreview" src={ejercicioData.videoLink || undefined} className="video-iframe-preview"
                        allowFullScreen title="Vista previa del video del ejercicio">
                    </iframe>

                </div>
            </div>
        </div>




    )
}

export default CrudEjercicioBasico;