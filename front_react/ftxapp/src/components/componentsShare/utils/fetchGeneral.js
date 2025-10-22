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
  if (setLoading) setLoading(true);

  const isFormData = body instanceof FormData;
  const fetchOptions = {
    method,
    body: isFormData ? body : (body ? JSON.stringify(body) : null),
  };
  if (!isFormData) fetchOptions.headers = headers;

  try {
  const response = await fetch(url, fetchOptions);
  let data;

  try {
    data = await response.json();
  } catch (jsonError) {
    console.log("Error al parsear JSON:", jsonError.message);
    throw new Error("Respuesta inválida del servidor.");
  }

  if (!response.ok) {
    const errorMessage = data?.message || `Error ${response.status}: ${response.statusText}`;
    console.log("errorMessage", errorMessage);
    showModal(errorMessage, "error", 0, true);
    throw new Error(errorMessage);
  }

  //console.log("%cOperación exitosa","color:green;", data);
  if (showModal && method !== "GET") {
    showModal("Operación exitosa", "success", 2000);
  }

  if (onSuccess) onSuccess(data);
  if (setError) setError(null);

  /* if (showModal && method !== "GET") {
    showModal("Operación exitosa", "success", 2000);
  } */
} catch (err) {
  //console.log("%cError atrapado en catch","color:red;", err.message);

  if (setError) setError(err.message);
  if (onError) onError(err);
  if (setMostrarErrorAcceso) setMostrarErrorAcceso(true);

  if (showModal) {
    showModal(err.message === "Failed to fetch" ? "Falló la conexión a la base de datos" : err.message, "error", 4000, true);
  }
} finally {
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


