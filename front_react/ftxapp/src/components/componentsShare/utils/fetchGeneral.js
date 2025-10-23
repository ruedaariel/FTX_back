import { extraerMensajeError } from "./extraerMensajeError";

/**
 * Función genérica para realizar peticiones HTTP con manejo centralizado de errores, modales y estados.
 *
 * ✅ ¿Cómo usarla?
 * 
 * import { fetchGeneral } from "./utils/fetchGeneral";
 * import { useModal } from "../context/ModalContext";
 * 
 * const { showModal } = useModal();
 * 
 * fetchGeneral({
 *   url: "/api/endpoint",
 *   method: "POST",
 *   body: datos,
 *   setLoading,              // opcional: actualiza estado de carga
 *   setError,                // opcional: guarda mensaje de error
 *   onSuccess: (data) => {}, // callback en caso de éxito
 *   onError: (err) => {},    // callback en caso de error
 *   showModal,               // muestra modal de éxito o error
 * });
 */

export const fetchGeneral = async ({
  url,
  method = "GET",
  body = null,
  headers = { "Content-Type": "application/json" },
  setLoading,
  setError,
  setMostrarErrorAcceso,
  onSuccess,
  onError,
  showModal,
}) => {
  // Activar estado de carga si se proporciona
  if (setLoading) setLoading(true);

  // Detectar si el body es FormData
  const isFormData = body instanceof FormData;

  // Configurar opciones de la petición
  const fetchOptions = {
    method,
    body: isFormData ? body : (body ? JSON.stringify(body) : null),
  };

  // Solo agregar headers si no es FormData
  if (!isFormData) {
    fetchOptions.headers = headers;
  }

  try {
    // Ejecutar la petición
    const response = await fetch(url, fetchOptions);
    let data;

    // Intentar parsear la respuesta como JSON
    try {
      data = await response.json();
    } catch (jsonError) {
      console.log("Error al parsear JSON:", jsonError.message);
      throw new Error("Respuesta inválida del servidor.");
    }

    // Si la respuesta no fue exitosa, lanzar error con mensaje del backend
    if (!response.ok) {
      const errorMessage = data?.message || `Error ${response.status}: ${response.statusText}`;
      console.log("errorMessage", errorMessage);

      if (showModal) {
        showModal(errorMessage, "error", 0, true); // Modal persistente
      }

      throw new Error(errorMessage);
    }

    // Mostrar modal de éxito si no es una petición GET
    if (showModal && method !== "GET") {
      showModal("Operación exitosa", "success", 2000);
    }

    // Ejecutar callback de éxito
    if (onSuccess) onSuccess(data);

    // Limpiar error si se proporciona
    if (setError) setError(null);
  } catch (err) {
    // Extraer mensaje legible desde el error
    const mensaje = extraerMensajeError(err);

    // Actualizar estado de error si se proporciona
    if (setError) setError(mensaje);

    // Ejecutar callback de error si se proporciona
    if (onError) onError(err);

    // Mostrar error de acceso si corresponde
    if (setMostrarErrorAcceso) setMostrarErrorAcceso(true);

    // Mostrar modal de error
    if (showModal) {
      showModal(mensaje, "error", 4000, true);
    }
  } finally {
    // Desactivar estado de carga
    if (setLoading) setLoading(false);
  }
};




/* export const fetchGeneral = async ({
  url,
  method = "GET",
  body = null,
  headers = { "Content-Type": "application/json" },
  setLoading,
  setError,
  setMostrarErrorAcceso,
  onSuccess,
  onError,
  mostrarModal,
}) => {
  if (setLoading) setLoading(true);

  //detecta si es formData
  const isFormData = body instanceof FormData;

  const fetchOptions = {
    method,
    // Si es FormData, el body es el objeto FormData directo.
    // Si no lo es, y el body no es null, se serializa a JSON.
    body: isFormData ? body : (body ? JSON.stringify(body) : null),
  };

  if (!isFormData) {
    fetchOptions.headers = headers;
  }
  // Si es FormData, NO pasamos el encabezado Content-Type.

  try {
    const response = await fetch(url, fetchOptions);
  const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    } 

  
    if (onSuccess) onSuccess(data);
    if (setError) setError(null);

    // Mostrar modal de éxito solo si no es GET
    if (mostrarModal && method !== "GET") {
      mostrarModal({
        title: "Operación exitosa",
        message: "La acción se completó correctamente.",
        borderClass: "borde-verde",
        autoCloseMs: 2000, // ← solo 2 segundos
      });
    }
  } catch (err) {
    console.log("error", err.message);
    if (setError) setError(err.message);
    if (onError) onError(err);
    if (setMostrarErrorAcceso) setMostrarErrorAcceso(true);

    //  Mostrar modal de error siempre
    if (mostrarModal) {
      mostrarModal({
        title: "Error",
        message: err.message || "Falló la operación.",
        borderClass: "borde-rojo",
        autoCloseMs: 4000,
      });
    }
  } finally {
    if (setLoading) setLoading(false);
  }
}; */


