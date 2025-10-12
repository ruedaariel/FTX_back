import React, { useState, useEffect } from "react";
import SemanaRutina from "./semanaRutina/semanaRutina";
import "./rutinaModular.css";

// Utilidades para manipular la rutina
import {
  guardarSemanaCompleta,
  agregarEjercicioEnDia,
  agregarDiaEnSemana,
  eliminarEjercicioDeDia,
  agregarDiaEnSemanaConLimite,
  avanzarODuplicarSemana,
  diaTieneEjercicios
} from "./../../../componentsShare/utils/rutinaUtils";

// Modales
import ModalDecision from "./../../../componentsShare/Modal/ModalDecision";
import ModalInfoTemporizado from "./../../../componentsShare/Modal/ModalInfoTemporizado";

const RutinaVisual = ({ rutina }) => {
  // Estado editable de la rutina
  const [rutinaEditable, setRutinaEditable] = useState(null);

  // Estado de navegación y mensajes
  const [semanaActivaIndex, setSemanaActivaIndex] = useState(0);
  const [mostrarModalDecision, setMostrarModalDecision] = useState(false);
  const [mostrarModalInfo, setMostrarModalInfo] = useState(false);
  const [mensajeModalInfo, setMensajeModalInfo] = useState("");

  // Mostrar mensaje informativo temporal
  const mostrarModalInfoTemporizado = (mensaje, duracion = 3000) => {
    setMensajeModalInfo(mensaje);
    setMostrarModalInfo(true);
  };

  // Expandir o contraer una semana
  const toggleSemanaExpandida = (index) => {
    setSemanaActivaIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Inicializar rutina editable al recibirla
  useEffect(() => {
    if (rutina) {
      setRutinaEditable(rutina);
    }
  }, [rutina]);

  // Guardar día y avanzar si corresponde
  const handleGuardarDia = (semanaIndex, diaIndex) => {
    const semanaActual = rutinaEditable.semanas[semanaIndex];
    const cantidadDias = semanaActual.dias.length;

    if (cantidadDias < 7) {
      const nuevaRutina = agregarDiaEnSemana(rutinaEditable, semanaIndex);
      setRutinaEditable(nuevaRutina);
      return;
    }

    const siguienteSemanaExiste = rutinaEditable.semanas.length > semanaIndex + 1;
    const rutinaTiene4Semanas = rutinaEditable.semanas.length >= 4;

    if (siguienteSemanaExiste) {
      setSemanaActivaIndex(semanaIndex + 1);
      mostrarModalInfoTemporizado("Semana completa, pasando a la siguiente");
      return;
    }

    if (rutinaTiene4Semanas) {
      setMostrarModalDecision(true);
      mostrarModalInfoTemporizado("Se alcanzó el límite de 4 semanas");
      return;
    }

    const nuevaRutina = avanzarODuplicarSemana(rutinaEditable, semanaIndex);
    setRutinaEditable(nuevaRutina);
    setSemanaActivaIndex(semanaIndex + 1);
    mostrarModalInfoTemporizado("Semana completa, comenzando nueva semana");
  };

  // Guardar semana actual (estructura lista para backend)
  const handleGuardarSemana = (semanaIndex) => {
    const payload = guardarSemanaCompleta(rutinaEditable, semanaIndex);
    // Aquí podrías enviar el payload al backend
  };

  // Guardar semana y avanzar, completando días si faltan
  const handleGuardarSemanaAvanzar = (semanaIndex) => {
    let nuevaRutina = { ...rutinaEditable };
    const semanaActual = nuevaRutina.semanas[semanaIndex];

    while (semanaActual.dias.length < 7) {
      semanaActual.dias.push({
        focus: "",
        ejerciciosRutina: [
          {
            idEjercicioBasico: "",
            repeticiones: "",
            peso: "",
            dificultad: "",
            observaciones: ""
          }
        ]
      });
    }

    const siguienteSemanaExiste = nuevaRutina.semanas.length > semanaIndex + 1;
    const rutinaTiene4Semanas = nuevaRutina.semanas.length >= 4;

    if (siguienteSemanaExiste) {
      setRutinaEditable(nuevaRutina);
      setSemanaActivaIndex(semanaIndex + 1);
      mostrarModalInfoTemporizado("Pasando a la siguiente semana");
      return;
    }

    if (rutinaTiene4Semanas) {
      setRutinaEditable(nuevaRutina);
      setMostrarModalDecision(true);
      mostrarModalInfoTemporizado("Se alcanzó el límite de 4 semanas");
      return;
    }

    nuevaRutina = avanzarODuplicarSemana(nuevaRutina, semanaIndex);
    setRutinaEditable(nuevaRutina);
    setSemanaActivaIndex(semanaIndex + 1);
    mostrarModalInfoTemporizado("Nueva semana creada");
  };

  // Actualizar un ejercicio específico
  const handleEjercicioChange = (semanaIndex, diaIndex, ejercicioIndex, nuevoEjercicio) => {
    const nuevaRutina = { ...rutinaEditable };
    nuevaRutina.semanas[semanaIndex].dias[diaIndex].ejerciciosRutina[ejercicioIndex] = nuevoEjercicio;
    setRutinaEditable(nuevaRutina);
  };

  // Agregar ejercicio en posición específica
  const handleAgregarEjercicio = (semanaIndex, diaIndex, ejercicioIndex) => {
    const nuevaRutina = agregarEjercicioEnDia(rutinaEditable, semanaIndex, diaIndex, ejercicioIndex);
    setRutinaEditable(nuevaRutina);
  };

  // Eliminar ejercicio en posición específica
  const handleEliminarEjercicio = (semanaIndex, diaIndex, ejercicioIndex) => {
    const nuevaRutina = eliminarEjercicioDeDia(rutinaEditable, semanaIndex, diaIndex, ejercicioIndex);
    setRutinaEditable(nuevaRutina);
  };

  // Guardar rutina completa (estructura lista para backend)
  const handleGuardarRutina = () => {
    const payload = rutinaEditable.semanas.map((semana, index) =>
      guardarSemanaCompleta(rutinaEditable, index)
    );

    console.log("Payload completo de rutina:", payload);
    setMostrarModalDecision(false);
  };

  // Validación inicial
  if (!rutinaEditable?.semanas?.length) {
    return <p>No hay semanas cargadas.</p>;
  }

  // Render principal
  return (
    <div className="rutina-visual">
      {/* Modal de decisión al alcanzar el límite de semanas */}
      {mostrarModalDecision && (
        <ModalDecision
          isOpen={mostrarModalDecision}
          title="Límite alcanzado"
          message="Se alcanzó el límite de 4 semanas. ¿Querés guardar la rutina o seguir editando?"
          onDecision={(confirmar) => {
            if (confirmar) {
              handleGuardarRutina();
            } else {
              setMostrarModalDecision(false);
            }
          }}
        />
      )}

      {/* Modal informativo temporal */}
      {mostrarModalInfo && (
        <ModalInfoTemporizado
          isOpen={mostrarModalInfo}
          title="Información"
          message={mensajeModalInfo}
          borderClass="modal-info-border"
          onClose={() => setMostrarModalInfo(false)}
          autoCloseMs={3000}
        />
      )}

      {/* Render de cada semana */}
      {rutinaEditable.semanas.map((semana, index) => (
        <SemanaRutina
          key={index}
          semana={semana}
          nroSemana={index + 1}
          semanaIndex={index}
          esActiva={index === semanaActivaIndex}
          onEjercicioChange={handleEjercicioChange}
          onAgregarEjercicio={handleAgregarEjercicio}
          onEliminarEjercicio={handleEliminarEjercicio}
          onGuardarDia={handleGuardarDia}
          onGuardarSemana={handleGuardarSemana}
          onGuardarSemanaAvanzar={handleGuardarSemanaAvanzar}
          onToggleExpand={toggleSemanaExpandida}
        />
      ))}
    </div>
  );
};

export default RutinaVisual;
