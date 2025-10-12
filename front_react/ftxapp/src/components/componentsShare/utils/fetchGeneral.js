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

    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    if (onSuccess) onSuccess(data);
    if (setError) setError(null);

    // ✅ Mostrar modal de éxito solo si no es GET
    if (mostrarModal && method !== "GET") {
      mostrarModal({
        title: "Operación exitosa",
        message: "La acción se completó correctamente.",
        borderClass: "borde-verde",
        autoCloseMs: 2000, // ← solo 2 segundos
      });
    }
  } catch (err) {
    if (setError) setError(err.message);
    if (onError) onError(err);
    if (setMostrarErrorAcceso) setMostrarErrorAcceso(true);

    // ❌ Mostrar modal de error siempre
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
};


