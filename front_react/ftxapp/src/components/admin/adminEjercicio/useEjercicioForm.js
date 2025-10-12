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
            const value = data[nombreEj];
            const error = validarCampo(nombreEj, value);
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

            setEjercicioData(prevData => {
                //  Limpieza de la URL anterior 
                if (prevData.imagenPreviewUrl && prevData.imagenPreviewUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(prevData.imagenPreviewUrl);
                }
                return {
                    ...prevData,
                    imagenPreviewUrl: previewUrl,
                    imagenFile: file,
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { errores, esValido } = validarTodoEjercicio(ejercicioData);
        setErrores(errores);

        if (!esValido) {
            console.log("formulario con errores");
            setLoading(false);
            return;
        }

        //Preparacion para enviar al backend

        const urlBase = "http://localhost:8000/apiFtx/ejbasico";
        const method = modoEjercicio === 'Crear' ? "POST" : "PATCH";
        const url = modoEjercicio === 'Crear'
            ? `${urlBase}/register`
            : `${urlBase}/update/${ejercicioData.idEjercicioBasico}`;

        const formData = new FormData();
        for (const key in ejercicioData) {

            if (key === 'imagenFile' && ejercicioData.imagenFile) {
                //  Adjuntamos el objeto File usando la clave que espera el backend ('imagenLink')
                formData.append('imagenLink', ejercicioData.imagenFile);
                continue;
            } else if (key === 'imagenPreviewUrl') {
                // Ignoramos la URL temporal
                continue;
            } else if (ejercicioData[key] !== null && ejercicioData[key] !== undefined) {
                // Agregar el resto de campos (nombreEjercicio, observaciones, videoLink)
                formData.append(key, ejercicioData[key]);
            }
        }

         try {
       
            await fetchGeneral({ 
                url: url,
                method: method,
                body: formData, // Usa el objeto FormData como body
                setLoading,
                setError,
                onSuccess: (data) => setEjercicioData(EJERCICIO_VACIO),
                // 💡 Puedes agregar la lógica para recargar la lista de ejercicios aquí
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
        handleInputChange,
        handleBlur,
        handleSubmit,
    };
}

