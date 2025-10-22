import React from 'react';

function Footer() {
   
    return (

    <footer>
        <div className="container">
            <p>&copy; 2025 FTX Fitness. Todos los derechos reservados.</p>
            <p>
                <a href="index.html">Inicio</a> |
                <a href="./contacto/contacto.html">Contacto</a> |
                <a href="#" odata-bs-toggle="modal" data-bs-target="#terminosCondiciones">Política de Privacidad</a> |
                <a href="#" data-bs-toggle="modal" data-bs-target="#terminosServicio">Términos de Servicio</a>
            </p>
            <div className="footer-social">
                <a href="https://x.com/?lang=es" className="me-2"><i className="fab fa-twitter"></i></a>
                <a href="https://www.facebook.com" className="me-2"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/" className="me-2"><i className="fab fa-instagram"></i></a>

                <a  href="https://www.linkedin.com/" className="me-2"><i className="fab fa-linkedin-in"></i></a>
                <a href="https://www.youtube.com/" className= "me-2"><i className="fa-brands fa-youtube"></i></a>
            </div>
        </div>

        


        <div id="terminosServicio" className="modal fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Términos de Servicio</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">

                        <h5>Introducción</h5>
                        <p>🔹 Bienvenido/a a <strong>FTX Training</strong>. Al utilizar nuestra plataforma, aceptas
                            cumplir con los siguientes términos.</p>

                        <h5>Descripción del Servicio</h5>
                        <p>🔹 <strong>FTX Training</strong> es una plataforma de fitness que ofrece rutinas de
                            ejercicio, seguimiento de progreso y opciones de suscripción (<em>Básico, Pro y
                                Premium</em>).</p>

                        <h5>Registro y Cuentas</h5>
                        <p>🔹 Para acceder a ciertas funciones, debes crear una cuenta.</p>
                        <p>🔹 La información proporcionada debe ser precisa y actualizada.</p>
                        <p>🔹 Eres responsable de la seguridad de tu cuenta y contraseña.</p>

                        <h5>Planes y Pagos</h5>
                        <p>🔹 El plan <strong>Básico</strong> es gratuito, mientras que los planes <strong>Pro y
                                Premium</strong> requieren un pago mensual.</p>
                        <p>🔹 Los pagos se procesan a través de pasarelas seguras.</p>
                        <p>🔹 No ofrecemos reembolsos excepto en casos específicos establecidos en nuestra política de
                            cancelación.</p>

                        <h5>Uso Adecuado del Servicio</h5>
                        <p>🔹 No debes compartir, vender o usar ilegalmente el contenido de la plataforma.</p>
                        <p>🔹 Se prohíbe el uso de lenguaje ofensivo en comentarios o interacción con otros usuarios.
                        </p>
                        <p>🔹 No nos hacemos responsables de lesiones o daños derivados de la aplicación de los
                            entrenamientos. Ante la duda de cualquier ejercicio, consultar al Entreenador responsable de
                            las mismas</p>

                        <h5>Modificaciones en los Términos</h5>
                        <p>🔹 Nos reservamos el derecho de actualizar estos términos en cualquier momento. Si hay
                            cambios importantes, te notificaremos por correo o en la plataforma.</p>

                        <h5>Privacidad y Protección de Datos</h5>
                        <p>🔹 Consulta nuestra <a href="#" data-bs-toggle="modal"
                                data-bs-target="#terminosCondiciones">Política de Privacidad</a> para entender cómo
                            protegemos tu información.</p>

                        <h5>Contacto</h5>
                        <p>🔹 Si tienes dudas sobre estos términos, puedes escribirnos a <strong>[correo de soporte
                                ACTUALIZAR]</strong>.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>




            </div>
        </div>



    </footer>








    )

}
  
  export default Footer