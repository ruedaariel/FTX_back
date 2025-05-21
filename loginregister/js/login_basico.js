/*-- ==========================================================================
   Archivo: login_basico.js
   Descripción: Permite el manejo del modal de error de login_basico.html, redirige la entrada al home del usuario o al home del admin
   ========================================================================== */


const form = document.querySelector('form');
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

            /* leo los datos ingresado */
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            /* valido que sea un usuario existente y lo envio a home_usuario*/
            /* caso contrario muestro modal de error*/

            if (email === 'mauricio@ejemplo.com' && password === 'mauricio2025') {
                window.location.href = '../Usuario/home_usuario.html'; // Redirige al home del usuario 
            } else if (email === 'admin@ejemplo.com' && password === 'admin2025') {
                window.location.href = '../Administrador/home_administrador.html'; // Redirige al home del administrador
            } else {
                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
                
                myModal.show(); // Muestra el modal
                
            }
        });

        // logica par recargar la pagina al cerrar el modal

        var myModal = document.getElementById('exampleModal')
        myModal.addEventListener('hidden.bs.modal', function (event) {
            location.reload();
        })