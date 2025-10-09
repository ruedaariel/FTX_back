import React, { useEffect, useState } from "react";
import { fetchGeneral } from "../../componentsShare/utils/fetchGeneral";
import '../../../colores.css';
import './validacion.css';
import './crud_ejercicio.css';
import SelectorEjercicio from "./selectorEjercicio";
import ModalInfoTemporizado from "../../componentsShare/Modal/ModalInfoTemporizado";




const CrudEjercicioBasico = () => {

    const EJERCICIO_VACIO = {
        nombre_ejercicio: "",
        observaciones: "",
        imagenLink: null, // con "" da error o warning
        videoLink: null,
    };

    const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);
    const [modoEjercicio, setModoEjercicio] = useState("Crear");

    const [ejercicioData, setEjercicioData] = useState(EJERCICIO_VACIO); //contendrá los datos del formulario

    const [ejercicios, setEjercicios] = useState([]); //ejercicios que vienen del backend

    const [loading, setLoading] = useState(false); //maneja delay
    const [error, setError] = useState(null);

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
            setEjercicioData(EJERCICIO_VACIO);
        }
    }
    // Manejador que selecciona un ejercicio por su ID (si es necesario) o por el objeto
    const handleSeleccionarEjercicio = (ejercicio) => {
        if (ejercicio && ejercicio.id) {
            setEjercicioSeleccionado(ejercicio);
            setEjercicioData(ejercicio);
        } else {
            setEjercicioSeleccionado(null);
            setEjercicioData(EJERCICIO_VACIO);
            //VER SI MANDO ERROR O SI CARGO EJERCICIOVACIO
        }

    }


    return (
        <main className="container">
            <SelectorEjercicio
                modoEjercicio={modoEjercicio}
                ejercicios={ejercicios}
                ejercicioSeleccionado={ejercicioSeleccionado}
                onSeleccionarEjercicio={handleSeleccionarEjercicio}
                noCambiarModo={handleSeleccionarModo}
                loading={loading}
                error={error}
            ></SelectorEjercicio>

            <form id="ejercicioForm">
                <div className="form-container">
                    {/*columna izq - contiene la informacion basica del ej*/}
                    <div className="columna-izq">

                        <div className="form-group">
                            <label htmlFor="nombreEjercicio">Nombre Ejercicio:</label>
                            <div className="input-icon-validate">
                                <input type="text" id="nombreEjercicio" name="nombreEjercicio" className="form-control"
                                    required placeholder="El nombre debe ser unico, por ejemplo, sentadilla sumo" />
                                <span className="icon-validate" data-icon="nombre_ejercicio"></span>
                            </div>
                            <div className="input-warning text-danger" data-warn="nombre_ejercicio" style={{ display: "none" }}  >
                            </div>
                        </div>



                        <div className="form-group">
                            <label htmlFor="observaciones">Observaciones:</label>
                            <textarea id="observaciones" name="observaciones" className="form-control"></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="imagenLink">Link Imagen: </label>
                            <input type="file" id="imagenLink" name="imagenLink" className="form-control" accept="image/*" />
                        </div>
                        {/*
                        <div className="form-group">
                            <label htmlFor="videoLink">Link Video: <span className="etiqueta-carga"
                                onclick="previsualizarVideo()">Previsualizar video</span></label>
                            <input type="url" id="videoLink" name="videoLink" className="form-control" />
                        </div>

                          <div className="botones">
                            <button type="submit" className="btn btn-primary">Guardar</button>
                            <button type="button" className="btn btn-danger">Eliminar</button>
                        </div>*/}
                    </div>

                    { /*columna derecha: vista previa de imagen y video*/}
                    <div className="columna-der">
                        <div className="imagen-preview">
                            <h4>Vista previa de la imagen</h4>
                            <img id="imagenPreview" src=""
                                alt="Vista previa de la imagen" style={{ maxWidth: '100%', maxHeight: '150px' }} />
                        </div>
                        <div className="video-preview">
                            <h4>Vista previa del video</h4>
                            {/*   <video id="videoPreview" width="100%" height="150" controls></video>*/}
                            <iframe id="videoPreview" src="" frameBorder="0" allowFullScreen>
                            </iframe>

                        </div>
                    </div>
                </div>

            </form >
        </main >

    )
}

export default CrudEjercicioBasico;