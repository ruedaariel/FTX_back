import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./GraficoPagosMensuales.css";

// Función para totalizar pagos por mes
function totalizarPagosPorMes(pagos, year = "25") {
  const meses = Array.from({ length: 12 }, (_, i) => `${String(i+1).padStart(2,"0")}/${year}`);
  const totales = Object.fromEntries(meses.map(m => [m, 0]));

  pagos.forEach(pago => {
    if (!pago.fechaPago || pago.fechaPago === "sFecha") return;
    const [dia, mes, anio] = pago.fechaPago.split("/").map(Number);
    if (String(anio) === year) {
      const clave = `${String(mes).padStart(2,"0")}/${year}`;
      totales[clave] += parseFloat(pago.monto) || 0;
    }
  });

  return totales;
}

const GraficoPagosMensuales = ({ pagos, year = "25" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const totales = totalizarPagosPorMes(pagos, year);
    const labels = Object.keys(totales);
    const valores = Object.values(totales);

    const ctx = canvasRef.current.getContext("2d");

    // Destruir gráfico previo si existe
    if (canvasRef.current.chartInstance) {
      canvasRef.current.chartInstance.destroy();
    }

canvasRef.current.chartInstance = new Chart(ctx, {
  type: "bar",
  data: {
    labels: labels,
    datasets: [{
      label: `Pagos por mes (${year})`,
      data: valores,
      backgroundColor: "#f4ae52",
      borderColor: "#f4ae52",
      borderWidth: 1,
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: "#f4ae52", // color de las etiquetas del eje X
        },
        grid: {
          color: "#ddd1d1", // color de las líneas de la grilla
          borderColor: "#f4ae52"    // color del borde del eje
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#f4ae52", // color de las etiquetas del eje Y
          callback: function(value) {
            return "$ " + value.toLocaleString("es-AR");
          }
        },
        grid: {
          color: "#ddd1d1", // color de las líneas horizontales
          borderColor: "#f4ae52"    // color del eje Y
        }
      }
    }
  }
});
  }, [pagos, year]);

  return (
    <div className="grafico-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default GraficoPagosMensuales;

