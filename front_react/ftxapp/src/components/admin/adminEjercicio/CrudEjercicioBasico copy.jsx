import React, { useEffect, useState } from "react";
import { fetchGeneral } from "../../componentsShare/utils/fetchGeneral";
import '../../../colores.css';
import './validacion.css';
import './crud_ejercicio.css';
import SelectorEjercicio from "./selectorEjercicio";
import ModalInfoTemporizado from "../../componentsShare/Modal/ModalInfoTemporizado";




const CrudEjercicioBasico = () => {


    const [ejercicios, setEjercicios] = useState([]);
    const [unEjercicio, setUnEjercicio] = useState(null);
    const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);

    //  Estados de edición y eliminación
    const [ejercicioEditando, setEjercicioEditando] = useState(null);
    const [ejercicioAEliminar, setEjercicioAEliminar] = useState(null);
    const [mostrarDecision, setMostrarDecision] = useState(false);

    // Estados de carga y error
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarErrorAcceso, setMostrarErrorAcceso] = useState(false);


    const [ejercicioData, setEjercicioData] = useState(null);

    useEffect(() => {
        if (ejercicioSeleccionado?.idEjercicioBasico) {
            fetchGeneral({
                url: `http://localhost:8000/apiFtx/ejbasico/${ejercicioSeleccionado.idEjercicioBasico}`,
                method: "GET",
                onSuccess: (data) => setRutinaData(data),
            });
        }
    }, [ejercicioSeleccionado]);


    //  Función para obtener ejercicios desde el backend
    const obtenerEjercicios = () => {
        fetchGeneral({
            url: "http://localhost:8000/apiFtx/ejbasico/allnames",
            method: "GET",
            setLoading,
            setError,
            setMostrarErrorAcceso,
            onSuccess: (data) => setEjercicios(data),
            mostrarModal, // solo muestra modal si hay error
        });
    };
    // Efecto inicial para obtener usuarios al montar el componente
    useEffect(() => {
        obtenerEjercicios();
    }, []);



    //  Estado para modal de éxito (no usado directamente)
    //     const [modalExito, setModalExito] = useState(false);

    //  Estado para modal de información reutilizable
    // const [modalConfig, setModalConfig] = useState({
    //     isOpen: false,
    //     title: "",
    //     message: "",
    //     borderClass: "",
    //     autoCloseMs: null,
    // });


    //  }



    // Función para mostrar el modal informativo con cierre automático
    // const mostrarModal = ({ title, message, borderClass, autoCloseMs }) => {
    //     setModalConfig({ isOpen: true, title, message, borderClass, autoCloseMs });

    //     if (autoCloseMs) {
    //         setTimeout(() => {
    //             setModalConfig((prev) => ({ ...prev, isOpen: false }));
    //         }, autoCloseMs);
    //     }
    // };

    //  Función para obtener un ejercicio desde el backend
    const obtenerUnEjercicio = (id) => {
        fetchGeneral({
            url: `http://localhost:8000/apiFtx/ejbasico/${id}`,
            method: "GET",
            setLoading,
            setError,
            setMostrarErrorAcceso,
            onSuccess: (data) => setUnEjercicio(data),
            mostrarModal, // solo muestra modal si hay error
        });
    };

    const handleChange = (e) => {
        // e.target.value contiene el value del option (aquí el id)
        // Convertir a number si tus ids son numéricos
        const id = e.target.value === '' ? '' : Number(e.target.value);
        setSelectedId(id);
        obtenerUnEjercicio(selectedId)
        // hacer algo con el id seleccionado, por ejemplo:
        // cargar detalle: fetch(`/api/ejercicios/${id}`)
    };

    //  Función para guardar cambios del usuario editado
    const handleGuardarCambios = (datosActualizados) => {
        fetchGeneral({
            url: `http://localhost:8000/apiFtx/ejbasico/update/${usuarioEditando.id}`, //MODIFICAR ESTO EN FUNCION DEL EJERCICIO
            method: "PATCH",
            body: datosActualizados,
            setLoading,
            setError,
            onSuccess: () => {
                obtenerUsuarios(); // refrescar lista
                setUsuarioEditando(null); // cerrar modal
            },
            mostrarModal, // muestra modal de éxito por 2 segundos
        });
    };

    //  Función para iniciar eliminación de ejercicio
    const handleEliminarClick = (ejercicio) => {
        setUsuarioAEliminar(ejercicio);
        setMostrarDecision(true);
    };

    // ✅ Función que maneja la decisión del modal de confirmación
    const handleDecision = (respuesta) => {
        setMostrarDecision(false);
        if (!respuesta || !ejercicioAEliminar) return;
        eliminarEjercicio(
            ejercicioAEliminar.id,
            ejercicioAEliminar.nombre
        );

        setEjercicioAEliminar(null);
    };

    const eliminarEjercicio = (id, nombre) => {
        fetchGeneral({
            url: `http://localhost:8000/apiFtx/ejbasico/delete/${id}`,
            method: "DELETE",
            onSuccess: () => {
                obtenerUsuarios();
                mostrarModal({
                    title: "Ejercicio eliminado",
                    message: `El ejercicio "${nombre}" ha sido eliminado correctamente.`,
                    borderClass: "borde-verde",
                    autoCloseMs: 2000,
                });
            },
            mostrarModal,
        });
    };

    return (
        <main className="container">

            <form id="ejercicioForm">
                <div className="form-container">
                    {/*columna izq - contiene la informacion basica del ej*/}
                    <div className="columna-izq">
                        <div className="form-group">
                            <SelectorEjercicio onSeleccionarEjercicio={setEjercicioSeleccionado} />

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

                        <div className="form-group">
                            <label htmlFor="videoLink">Link Video: <span className="etiqueta-carga"
                                onclick="previsualizarVideo()">Previsualizar video</span></label>
                            <input type="url" id="videoLink" name="videoLink" className="form-control" />
                        </div>

                        {/*   <div className="botones">
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