export const guardarRutinaEnBackend = async (rutina) => {
  /* try {
    const response = await fetch("http://localhost:8000/apiFtx/rutina/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(rutina)
    });

    if (!response.ok) {
      throw new Error("Error al guardar la rutina");
    }

    return await response.json();
  } catch (error) {
    console.error("guardarRutinaEnBackend error:", error);
    throw error;
  } */
 console.log("guardarRutinaEnBackend rutina:", rutina);
  return rutina;
};
