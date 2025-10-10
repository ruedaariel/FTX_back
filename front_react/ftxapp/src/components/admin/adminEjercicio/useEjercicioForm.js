//Maneja la logica: validacion campo a campo, validacion antes del submit, creacion y edicion

import { useState, useEffect } from 'react';
import { EJERCICIO_VACIO } from './utils/ejercicio_vacio';
import { VALIDACION_REGLAS } from './utils/validacionReglas';

export const useEjercicioForm = (modoEjercicio, ejercicioSeleccionado) => {
    const [ejercicioData, setEjercicioData] = useState(EJERCICIO_VACIO);
    const [errores, setErrores] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const validarCampo = (nameEj, value) => {
        const reglas = VALIDACION_REGLAS[nameEj];
        let error = '';

        if (!reglas) return ''; //no hay reglas para ese campo

        if (reglas.required && !value) {
            error = reglas.messages.required;
        } else if (value) {
            if (reglas.min && String(value).length < reglas.min) {
                error = reglas.messages.min;
            } else if (reglas.regex && !reglas.regex.test(value)) {
                error = reglas.messages.regex;
            }
        }
        // **LÓGICA ESPECÍFICA PARA IMAGEN (imagenLink)**
        if (nameEj === 'imagenLink' && ejercicioData.imagenFile) { // Usamos el objeto File real
            const file = ejercicioData.imagenFile;
            const maxSizeInBytes = reglas.maxSizeMB * 1024 * 1024;

            if (file.size > maxSizeInBytes) {
                error = reglas.messages.maxSize;
                return error;
            }

            if (!file.type.match(/image\/(jpeg|png|webp)/)) {
                error = reglas.messages.invalidType;
                return error;
            }
        }
        return error;
    }

    const validarTodoEjercicio = (data) => {
        let esValido = true;
        let nuevosErrores = {};

        const camposaValidar = Object.keys(VALIDACION_REGLAS);

        camposaValidar.forEach(nombreEj => {
            const value = data[nameEj];
            const error = validarCampo(nameEj, value);
            if (error) {
                nuevosErrores[nombreEj] = error;
                esValido = false;
            }
        });
        return { nuevosErrores, esValido };
    }

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            const file = e.target.files[0];
            let previewUrl = null;

            if (file) {
                //Crear la URL temporal segura para el navegador
                previewUrl = URL.createObjectURL(file);
            }
            //    'imagenLink'  recibe la URL temporal
            //    'imagenFile'  recibe el objeto File para subir.
            setEjercicioData(prevData => {
                // 💡 Limpieza de la URL anterior 
                if (prevData.imagenLink && prevData.imagenLink.startsWith('blob:')) {
                    URL.revokeObjectURL(prevData.imagenLink);
                }
                return {
                    ...prevData,
                    [name]: previewUrl,
                };
            });
            return;
        }

        const transformedValue = name === 'nombreEjercicio' ? value.trim().replace(/\s+/g, ' ') : value;
        setEjercicioData(prevData => ({
            ...prevData, [name]: transformedValue,
        }));
    };

    //validacion por campo
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validarCampo(name, value);
        setErrores(prev => ({ ...prev, [name]: error }));//al estado previo, le agrega el nuevo

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { errores, esValido } = validarTodoEjercicio(ejercicioData);
        setErrores(errores);

        if (!esValido) {
            console.log("formulario con errores");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        for (const key in ejercicioData) {
            // Excluir la URL temporal de la imagen que usamos solo para preview
            if (key === 'imagenLink' && ejercicioData[key] instanceof File) {
                // Si imagenLink contiene el objeto File 
                if (ejercicioData.imagenFile) {
                    formData.append('imagenLink', ejercicioData.imagenFile);
                }
            } else if (key === 'imagenFile') {
                // Ignorar la clave temporal 'imagenFile' (es para visualizar)
                continue;
            } else if (ejercicioData[key] !== null && ejercicioData[key] !== undefined) {
                // Agregar el resto de campos (nombreEjercicio, observaciones, videoLink)
                formData.append(key, ejercicioData[key]);
            }
        }
        const body = { ...ejercicioData } //clona y limpia los datos
        if (modoEjercicio === 'Crear') {
            fetchGeneral({
                url: "http://localhost:8000/apiFtx/ejbasico/register",
                method: "POST",
                setLoading,
                setError,
                onSuccess: (data) => setEjercicioData(EJERCICIO_VACIO), //ver como recargar el arreglo de ejercicios
            });
        } else {
            if (modoEjercicio === 'Editar') {
                fetchGeneral({
                    url: `http://localhost:8000/apiFtx/ejbasico/update/${ejercicioData.idEjercicioBasico}`,
                    method: "PATCH",
                    setLoading,
                    setError,
                    onSuccess: (data) => setEjercicioData(EJERCICIO_VACIO), //ver como recargar el arreglo de ejercicios
                })
            } else {
                //borrar
            }
            //ver logica de edicion
        }

    }

    useEffect(() => {

        if (ejercicioSeleccionado && modoEjercicio === "Editar") {

            setEjercicioData(ejercicioSeleccionado);
            setErrores({}); // Limpiar errores al cargar nuevo ejercicio
        } else if (modoEjercicio === "Crear") {
            // Limpiar al modo Crear
            setEjercicioData(EJERCICIO_VACIO);
            setErrores({});
        }
    }, [modoEjercicio, ejercicioSeleccionado]);

    return {
        ejercicioData,
        errores,
        loading,
        handleInputChange,
        handleBlur,
        handleSubmit,
    };
}

