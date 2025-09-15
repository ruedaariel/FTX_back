Flujo correcto:

POST /pagos/iniciar → Recibe IniciarPagoDto del frontend
POST /pagos/webhook → Recibe notificaciones de MercadoPago 
 
 
 Ejemplo de uso desde el Frontend

 const datosParaPago: IniciarPagoDto = {
  // Datos básicos
  usuarioId: 123,
  monto: 2500.00,
  diasAdicionales: 30,
  metodoDePago: MetodoDePago.MERCADOPAGO,
  descripcion: "Plan Básico - 30 días de acceso",
  
  // Datos del cliente
  payer: {
    name: "Juan",
    surname: "Pérez", 
    email: "juan.perez@email.com",
    phone: "1134567890",
    identification_type: "DNI",
    identification_number: "12345678"
  },
  
  // URLs de retorno
  back_urls: {
    success: "https://tuapp.com/pago-exitoso",
    failure: "https://tuapp.com/pago-fallido", 
    pending: "https://tuapp.com/pago-pendiente"
  },
  
  // Configuraciones
  external_reference: "usuario-123-plan-basico",
  notification_url: "https://tuapp.com/api/pagos/webhook",
  currency_id: "ARS",
  installments: 6,
  expires: 1440  // 24 horas
};

// El frontend envía esto a POST /pagos/iniciar

¿Por qué tantos datos?
MercadoPago necesita esta información para:

Crear la preferencia completa con todos los detalles
Mostrar información correcta en el checkout
Procesar el pago de forma segura
Enviar notificaciones y redirecciones apropiadas
Cumplir regulaciones (identificación del pagador)
El frontend debe recopilar estos datos del usuario antes de enviar la petición al backend.