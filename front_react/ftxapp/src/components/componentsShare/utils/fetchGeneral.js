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

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

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


