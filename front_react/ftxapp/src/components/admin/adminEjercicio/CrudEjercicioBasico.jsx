import React, { useEffect, useState } from "react";
import { fetchGeneral } from "../../componentsShare/utils/fetchGeneral";
import '../../../colores.css';
import './validacion.css';
import './crud_ejercicio.css';
import SelectorEjercicio from "./selectorEjercicio";
import ModalInfoTemporizado from "../../componentsShare/Modal/ModalInfoTemporizado";




const CrudEjercicioBasico = () => {

    const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);
    const [modoEjercicio, setModoEjercicio] = useState("Crear");


    const handleModoChange = (nuevoModo) => {
        setModoEjercicio(nuevoModo);
        console.log("nuevoModo", nuevoModo);
        // cualquier lógica adicional al cambiar modo
    };

    const handleEjercicioChange = (nuevoEjercicio) => {
        setEjercicioSeleccionado(nuevoEjercicio);
        console.log(nuevoEjercicio)
        // por ejemplo: cargar datos del ejercicio para editar
    };

    return (
        <main className="container">
            <SelectorEjercicio
                modoEjercicio={modoEjercicio}
                ejercicioSeleccionado={ejercicioSeleccionado}
                setModoEjercicio={setModoEjercicio}
                onSeleccionarEjercicio={setEjercicioSeleccionado}></SelectorEjercicio>

            <form id="ejercicioForm">
                <div className="form-container">
                    {/*columna izq - contiene la informacion basica del ej*/}
                    <div className="columna-izq">

                        <div className="form-group">


                            {/* <select id="nombreEjercicio" name="nombreEjercicio" className="form-select" required>
                                    { /* ACA LLAMAR AL COMPONENTE DE ARIEL la lista de ejercicio se lee de la base de ejercicios - 
                            la opcion nuevo permitiria agregar un nuevo ejercicio a la base*/}

                            {/*      <option value="Nuevo">Nuevo</option>
                                    <option value="Press Banca">Press Banca</option>
                                    <option value="Sentadillas">Sentadillas</option>
                                    <option value="Dominadas">Dominadas</option>
                                    <option value="Peso Muerto">Peso Muerto</option>
                                    <option value="Remo con Barra">Remo con Barra</option>
                                </select> */}



                            <label htmlFor="nombre_ejercicio">Nombre Ejercicio:</label>
                            <div className="input-icon-validate">
                                <input type="text" id="nombre_ejercicio" name="nombre_ejercicio" className="form-control"
                                    required placeholder="espalda" />
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