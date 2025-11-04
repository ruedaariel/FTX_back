// Importación de React y estilos específicos del tab
import React, { useState } from "react";
import "./datosImagenSuscripcion.css";
import { fetchGeneral } from "../../../componentsShare/utils/fetchGeneral";
import {useModal} from "../../../../context/ModalContext";
import { extraerMensajeError } from "../../../componentsShare/utils/extraerMensajeError";



// Componente que representa la pestaña "Imagen y Suscripción"
const ImagenTab = ({ register, setValue, watch, errors }) => {
  
const [previewImagen, setPreviewImagen] = useState(watch("datosPersonales.imagenPerfil"));


  // Obtenemos el plan actual del usuario desde el formulario global
  const plan = watch("datosPersonales.plan");
  const { showModal } = useModal();



console.log("imagen:", previewImagen);
console.log("id usuario", watch("datosPersonales.idUsuario"));


const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
// Obtenemos el valor actual de la imagen de perfil desde el formulario global
const imagenPerfil = watch("datosPersonales.imagenPerfil");


const handleImagenChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImagenSeleccionada(file);
    const previewURL = URL.createObjectURL(file);
    setPreviewImagen(previewURL); // ← para mostrar en <img>
    setValue("datosPersonales.imagenPerfil", previewURL); // ← si querés que el formulario lo registre
  }
};


const handleGuardarImagen = async () => {
  if (!imagenSeleccionada) return;

  
  

  const url = `http://localhost:8000/apiFtx/usuario/${watch("datosPersonales.idUsuario")}/imagen-perfil`;
  const method = "Patch";
  const body = imagenSeleccionada;

  // 🔹 Crear FormData y adjuntar la imagen
  const formData = new FormData();
  formData.append("imagenPerfil", imagenSeleccionada);

  console.log("url --->", url);
  console.log("method--->", method);
  console.log("body--->", body);
  console.log("formData--->", formData);

  let resultado;

  await fetchGeneral({
      url,
      method,
      body: formData,
      showModal,
      onSuccess: (data) => {
        resultado = data;
      },
      onError: (err) => {
        const mensaje = extraerMensajeError(err);
        console.error("Error al guardar rutina:", mensaje);
      },
    });

  // try {
  //   const response = await fetch("/api/usuario/imagen", {
  //     method: "POST",
  //     body: imagenSeleccionada, // ← se envía el archivo directamente
  //     headers: {
  //       "Content-Type": imagenSeleccionada.type, // ej: "image/jpeg"
  //       Authorization: `Bearer ${token}` // si usás autenticación
  //     }
  //   });

  //   const resultado = await response.json();
  //   console.log("Imagen subida:", resultado);
  // } catch (error) {
  //   console.error("Error al subir imagen:", error);
  // }
};


  return (
    <div className="imagen-tab">
      {/* Sección izquierda: imagen de perfil y carga */}
      <div className="imagen-plan-precio">
        <div className="imagen-perfil-container">
  {/* Imagen actual del perfil */}
  {/* <img src={imagenPerfil} alt="Perfil" className="imagen-perfil" /> */}
  {/* <img src={previewImagen || "/default.png"} alt="Perfil" className="imagen-perfil" /> */}
    <img src={previewImagen} alt="Perfil" className="imagen-perfil" />


  <div className="input-mensaje">
    <div className="fila-imagen-acciones">
      {/* Input de archivo estilizado como botón */}
      <label className="custom-file-upload">
        <input
          type="file"
          accept=".jpg,.png"
          onChange={handleImagenChange}
        />
        
      </label>

      {/* Botón que aparece solo si hay imagen seleccionada */}
      {imagenSeleccionada && (
        <button
          type="button"
          className="btn-guardar-imagen"
          onClick={handleGuardarImagen}
        >
          Guardar imagen
        </button>
      )}
    </div>

    {/* Texto informativo sobre formatos permitidos */}
    <p className="formato-imagen"> Seleccionar imagen con formato JPG, PNG. Máx: 5MB</p>
  </div>
</div>


        {/* Sección derecha: formulario de cambio de contraseña */}
        <div className="div-password">
          <div className="plan-precio">
            <div className="plan-descripcion">
              <h1>{plan?.nombrePlan}</h1>
              <p>Acceso completo a todas las funciones</p>
            </div>

            <div className="precio">
              <h1>${plan?.precio}</h1>
              <p>por mes</p>
            </div>
            
          </div>
          {/* Botones de acción relacionados al plan */}
            <div className="botones-plan">
              <button className="btn-cambiar-plan">Cambiar plan</button>
              {/* <button className="btn-ver-facturacion">Ver facturación</button> */}
            </div>
        </div>
      </div>

      {/* Sección inferior: información del plan */}
      {/* <div className="plan-info"> */}
        {/* <div className="plan-precio">
          <div className="plan-descripcion">
            <h2>{plan?.nombrePlan}</h2>
            <p>Acceso completo a todas las funciones</p>
          </div>

          <div className="precio">
            <h2>${plan?.precio}</h2>
            <p>por mes</p>
          </div>
        </div> */}
        {/* Botones de acción relacionados al plan */}
        {/* <div className="botones-plan">
          <button className="btn-cambiar-plan">Cambiar plan</button>
          <button className="btn-ver-facturacion">Ver facturación</button>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default ImagenTab;
