import { id } from "date-fns/locale";

export const guardarRutinaEnBackend = async (idRutina, rutina, modoRutina) => {
  const baseUrl = "http://localhost:8000/apiFtx/rutina";
  let url = "";
  let method = "";
  /* console.log("************   GuardaRutinaBackend  ************");
  console.log("********  Modo rutina:", modoRutina, "**********");
  console.log(
      "Payload transformado:",
      JSON.stringify(rutina, null, 2)
    ); */

  if (modoRutina === "Editar") {
    /* console.log("Editar rutina");
    console.log("Rutina:", rutina);
    console.log("ID:", id); */
    //if (!rutina.id) throw new Error("Falta el ID de rutina para editar");
    url = `${baseUrl}/update/${idRutina}`;
    method = "PUT";
    
  } else {
    url = `${baseUrl}/register`;
    method = "POST";
  }

  /* console.log("URL:", url);
  console.log("Método:", method);
  console.log("Payload:", rutina); */
  //console.log("Rutina lista para enviar:", JSON.stringify(rutina, null, 2));
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rutina),
  });

  if (!response.ok) {
    const responseText = await response.text();
// console.error("Error al guardar:", response.status, responseText);
throw new Error(responseText || "Error al guardar la rutina");

    throw new Error("Error al guardar la rutina");
  }

  return await response.json();
};
