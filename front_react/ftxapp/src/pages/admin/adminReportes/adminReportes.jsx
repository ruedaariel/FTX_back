// ResumenPagos.js
import React from 'react';
import { useEffect, useState } from "react";
import { leerPagosDesdeURL } from "../../admin/adminPagos/components/utils/leerPagosDesdeURL";
import { normalizarPagos } from "../../admin/adminPagos/components/utils/normalizarPagos";
import { useModal } from "../../../context/ModalContext";
import HeaderCrud from "../../../components/componentsShare/header/HeaderCrud";
import { GoPeople } from "react-icons/go";
import { IoPeople } from "react-icons/io5";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import GraficoPagosMensuales from "./components/GraficoPagosMensuales/GraficoPagosMensuales"; 


import './adminReportes.css'; // Importa tu archivo de estilos

const ResumenPagos = ({ dataUsuarios, dataPagos }) => {
  const [pagos, setPagos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const { showModal } = useModal();
  // const [totalActivos, setTotalActivos] = useState(0); 

  useEffect(() => {
  leerPagosDesdeURL(
    "http://localhost:8000/apiFtx/pagos/impagos",
    setUsuarios,
    showModal,
    normalizarPagos // opcional
  );
}, []);

  useEffect(() => {
  leerPagosDesdeURL(
    "http://localhost:8000/apiFtx/pagos",
    setPagos,
    showModal,
    
  );
}, []);

const TotalPagos = [...pagos, ...usuarios];


// console.log("Usuarios :", usuarios);
 console.log("TotalPagos :", TotalPagos);

const calcularMetricas = (TotalPagos) => {
  let totalActivos = 0;
  let totalArchivados = 0;

  TotalPagos.forEach(user => {
    if (user.estadoUsuario === 'activo') {
      totalActivos++;
    } else if (user.estadoUsuario === 'archivado' || user.estadoUsuario === 'inactivo') {
      totalArchivados++;
    }
  });

  // Continuación: Calcular Totales de Pagos

  // Usaremos el mes 11 (Noviembre) del año '25.
  const MES_FILTRO = '11/25'; 
  let totalPagosNov25 = 0;
  let totalPagosGeneral = 0;

  TotalPagos.forEach(pago => {
    const monto = parseFloat(pago.monto);
    totalPagosGeneral += monto; 

   
    // Totalizar pagos de un mes específico
    if (pago.fechaPago != "sFecha" && pago.fechaPago.endsWith(MES_FILTRO)) {
      totalPagosNov25 += monto;
    }

  });

  console.log("Total Pagos Nov/25:", totalPagosNov25);
  return {
    totalActivos,
    totalArchivados,
    totalPagosNov25,
    totalPagosGeneral,
  };
};

  //1. Lógica para calcular métricas (ver sección siguiente)
  const { totalActivos, totalArchivados, totalPagosNov25, totalPagosGeneral } = calcularMetricas(TotalPagos);

  // 2. Renderizado del resumen
  return (

    <div className="container">
      <HeaderCrud
        title=" Reportes y Resúmenes"
        widthPercent={100}
        MostrarCerrarSesion={false}
      />

    <div className="resumen-container">
      {/* <h2>📊 Resumen de Usuarios y Pagos</h2> */}
      
      <div className="resumen-grid">
        {/* Cuadro 1: Usuarios por Estado */}
        <div className="resumen-card estado-card">
          {/* <h3>👤 Estado de Usuarios</h3> */}
          <h3> <IoPeople /> Estado de Usuarios</h3>
          <div className="usuarios-estado-detalles">
          <p>Activos: {totalActivos}</p>
          <p>Archivados/Inactivos: {totalArchivados}</p>
          </div>
        </div>

        {/* Cuadro 2: Total de Pagos (Ejemplo: Nov/25) */}
        <div className="resumen-card pagos-card">
          <h3> <FaMoneyBillTrendUp /> Pagos Noviembre 2025</h3>
          
          <p className="monto-total">Total: $ {totalPagosNov25.toLocaleString('es-AR')}</p>
          <p className="nota-total">Total de Pagos Registrados: {totalPagosGeneral.toLocaleString('es-AR')}</p>
        </div>
      </div>
    </div>
    <div className="grafico-barras-pagos-mensuales">
      <h2>📊 Resumen de Pagos</h2>
      <GraficoPagosMensuales pagos={TotalPagos} year="25"/>
    </div>
    </div>
  );
};

export default ResumenPagos;