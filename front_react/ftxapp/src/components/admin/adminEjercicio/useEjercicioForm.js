//Maneja la logica: validacion campo a campo, validacion antes del submit, creacion y edicion

import { useState, useEffect } from 'react';
import { EJERCICIO_VACIO } from './utils/ejercicio_vacio';
import { VALIDACION_REGLAS } from './utils/validacionReglas';
import { fetchGeneral } from "../../componentsShare/utils/fetchGeneral";

export const useEjercicioForm = (modoEjercicio, ejercicioSeleccionado, setReload, setEjecicioSeleccionado) => {
    const [ejercicioData, setEjercicioData] = useState(EJERCICIO_VACIO);
    const [errores, setErrores] = useState({});
   const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const validarCampo = (nameEj, value, tempEjercicioData = null) => {
        const reglas = VALIDACION_REGLAS[nameEj];
        let error = '';

        if (!reglas) return ''; //no hay reglas para ese campo

        if (nameEj === 'imagenLink') { // Usamos el objeto File real
            //  Usa el archivo del objeto temporal si se proporciona (en handleInputChange),
            //           o usa el archivo del estado global (en handleBlur o handleSubmit).
            const fileToValidate = tempEjercicioData ? tempEjercicioData.imagenFile : ejercicioData.imagenFile;

            // Si no hay archivo y no es requerido, se considera válido aquí.
            if (!fileToValidate) {
                return error;
            }

            const file = fileToValidate;
            const maxSizeInBytes = reglas.maxSizeMB * 1024 * 1024;
            console.log("filesise", file.size);
            console.log("maxsize", maxSizeInBytes);
            if (file.size > maxSizeInBytes) {
                console.log("detecta error tamaño");
                error = reglas.messages.maxSize;
                return error;
            }

            //validacion de tipo
            if (!reglas.allowedTypes.includes(file.type)) {
                error = reglas.messages.invalidType;
                return error;
            }
        }

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

        return error;
    }

    const validarTodoEjercicio = (data) => {
        let esValido = true;
        let nuevosErrores = {};
        console.log("entre a validar todo ejercicio", data);

        const camposaValidar = Object.keys(VALIDACION_REGLAS);

        camposaValidar.forEach(nombreEj => {
            const value = data[nombreEj];
            const error = validarCampo(nombreEj, value);
            if (error) {
                nuevosErrores[nombreEj] = error;
                esValido = false;
            }
        });
        //le cambio el nombre a nuevos errores
        return { errores: nuevosErrores, esValido };
    }

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            const file = e.target.files[0];
            let previewUrl = null;
            let validationError = '';

            if (file) {
                //Crear la URL temporal segura para el navegador
                previewUrl = URL.createObjectURL(file);

                // Temporalmente, se crea un objeto con el archivo para que validarCampo lo pueda usar
                const tempEjercicioData = { ...ejercicioData, imagenFile: file };
                // Llama a la validación. Si devuelve un string, es un error.
                validationError = validarCampo('imagenLink', file.name, tempEjercicioData);
            }
            // Se actualiza el estado de errores
            setErrores(prev => ({
                ...prev,
                // Asumiendo que el campo de error en el JSX es 'errores.imagenFile'
                imagenFile: validationError
            }));
            if (!validationError) {
                setEjercicioData(prevData => {
                    //  Limpieza de la URL anterior 
                    if (prevData.imagenPreviewUrl && prevData.imagenPreviewUrl.startsWith('blob:')) {
                        //libera memoria y recursos
                        URL.revokeObjectURL(prevData.imagenPreviewUrl);
                    }
                    return {
                        ...prevData, // Copia todas las propiedades
                        imagenPreviewUrl: previewUrl, //sobreescribe
                        imagenFile: file,//sobreescribe
                    };
                });
            } else {
                // Si hay error, limpiar el archivo y la previsualización del estado.
                setEjercicioData(prevData => {
                    if (prevData.imagenPreviewUrl && prevData.imagenPreviewUrl.startsWith('blob:')) {
                        URL.revokeObjectURL(prevData.imagenPreviewUrl);
                    }
                    return {
                        ...prevData,
                        imagenPreviewUrl: null,
                        imagenFile: null,
                    };
                });
            }
            return;
        }

        const transformedValue = name === 'nombreEjercicio' ? value.trim().replace(/\s+/g, ' ') : value;
        setEjercicioData(prevData => ({
            ...prevData, [name]: transformedValue,
        }));
    };



    // Detecta solo los campos modificados para la petición PATCH
    const getChangedFields = (ejercicioSeleccionado, ejercicioData) => {
        const changedFields = {};

        // Si no hay datos originales, algo es incorrecto en el modo 'Editar', pero devolvemos todo por seguridad.
        if (!ejercicioSeleccionado) return ejercicioData;

        for (const key in ejercicioData) {
            // Ignoramos las claves de control internas del frontend
            if (key === 'imagenPreviewUrl' || key === 'idEjercicioBasico') {
                continue;
            }

            const originalValue = ejercicioSeleccionado[key];
            const currentValue = ejercicioData[key];

            //  Comparación para campos que NO son archivos
            if (key !== 'imagenFile') {
                const originalStr = String(originalValue || '').trim();
                const currentStr = String(currentValue || '').trim();

                // Detectar si el valor ha cambiado
                if (originalStr !== currentStr) {
                    changedFields[key] = currentValue;
                }
            }
        }

      
        // no se puede comparar archivos, se detecta si ha seleccionado un archivo
        if (ejercicioData.imagenFile instanceof File) {
            changedFields.imagenLink = ejercicioData.imagenFile; // 
        }
        
        console.log("campos modificados ", changedFields);
        return changedFields;
    };

    //validacion por campo
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validarCampo(name, value);
        setErrores(prev => ({ ...prev, [name]: error }));//al estado previo, le agrega el nuevo

    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { errores, esValido } = validarTodoEjercicio(ejercicioData);
        setErrores(errores);

        if (!esValido) {
            setLoading(false);
            return;
        }

        //Preparacion para enviar al backend
        let dataToSend = {};
        const urlBase = "http://localhost:8000/apiFtx/ejbasico";
        let url = '';
        const method = modoEjercicio === 'Crear' ? "POST" : "PATCH";
        
        if (modoEjercicio === 'Crear') {
            url = `${urlBase}/register`;
            dataToSend = ejercicioData;
        } else { // modoEjercicio === 'Editar'
            url = `${urlBase}/update/${ejercicioData.idEjercicioBasico}`;
            
            // ejercicioSeleccionado es el estado original, ejercicioData es el estado actual.
            dataToSend = getChangedFields(ejercicioSeleccionado, ejercicioData); 

            // Si no hay campos cambiados, abortamos la petición PATCH
            if (Object.keys(dataToSend).length === 0) {
                console.log("No hay cambios detectados para guardar.");
                setLoading(false);
                return;
            }
        }

        //construccion del formData
        const formData = new FormData();

        for (const key in dataToSend) {

            if (key === 'imagenLink' && dataToSend.imagenLink instanceof File) {
                //  Adjuntamos el objeto File usando la clave que espera el backend ('imagenLink')
                formData.append('imagenLink', dataToSend.imagenLink);
            } else if (dataToSend[key] !== null && dataToSend[key] !== undefined) {
                formData.append(key,dataToSend[key]);
            }
        }

        try {

            await fetchGeneral({
                url: url,
                method: method,
                body: formData, // Usa el objeto FormData como body
                setLoading,
                setError,
                onSuccess: (data) => {
                    setEjercicioData(EJERCICIO_VACIO);
                    if (setReload) {
                        setReload(true);
                    }
                    if (typeof setEjecicioSeleccionado === 'function') {
                        setEjecicioSeleccionado(null)
                    }
                }
                // estado para reacargar ejercicios
            });

        } catch (error) {
            console.error("Error en la operación del formulario:", error);
        }
        
    }

    useEffect(() => {

        if (ejercicioSeleccionado && modoEjercicio !== 'Crear') {

            //REVOCAR URL antigua (si existe) para liberar memoria
            if (ejercicioData.imagenPreviewUrl && ejercicioData.imagenPreviewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(ejercicioData.imagenPreviewUrl);
            }

            //  Establecer los datos del ejercicio seleccionado
            setEjercicioData({
                ...ejercicioSeleccionado,
                imagenPreviewUrl: ejercicioSeleccionado.imagenLink || null,
                imagenFile: null, // Siempre nulo al cargar desde el servidor
            });
            setErrores({});

        } else {
            //  Lógica de Resetear (cuando se pasa a modo 'Crear' o el ejercicio se deselecciona)

            // REVOCAR URL antigua (si existe)
            if (ejercicioData.imagenPreviewUrl && ejercicioData.imagenPreviewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(ejercicioData.imagenPreviewUrl);
            }

            // Resetear al estado inicial
            setEjercicioData(EJERCICIO_VACIO);
            setErrores({});
        }

    }, [ejercicioSeleccionado, modoEjercicio]);

    return {
        ejercicioData,
        errores,
        loading,
        setLoading,
        handleInputChange,
        handleBlur,
        handleSubmit,
    };
}
