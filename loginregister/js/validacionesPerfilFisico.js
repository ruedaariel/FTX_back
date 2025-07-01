//espera a que el DOM esté completamente cargado y lanza los listener para hacer validaciones en linea
document.addEventListener('DOMContentLoaded', function () {
    const contenedor = document.getElementById("form-perfil");
    //escucha cuando hay un input en el form
    contenedor.addEventListener('input', function (event) {
        const input = event.target;

        if (input.id === "peso") { //peso entre 30 y 150, numeros reales con hasta 3 decimales
            const valor = input.value.trim();
            const numero = parseFloat(valor);
            const regex = /^(?:[1-9]\d{1,2})(?:\.\d{1,3})?$/;

            const campo = input.name.replace("[]", "");
            const grupo = input.closest(".form-group");
            const icon = grupo.querySelector(`[data-icon="${campo}"]`);
            const warn = grupo.querySelector(`[data-warn="${campo}"]`);
            const mensaje = "Debe ingresar un peso entre 30 y 150 kg";

            // Verificamos regex primero y luego rango
            const valido = regex.test(valor) && numero >= 30 && numero <= 150;

            actualizarEstado(valido, icon, warn, mensaje);
        }

        if (input.id === "estatura") { //numero entero entre 50 y 250
            const valor = input.value.trim();
            const numero = parseInt(valor);
            const regex = /^\d{2,3}$/; // permite entre 2 y 3 dígitos numéricos

            const campo = input.name.replace("[]", "");
            const grupo = input.closest(".form-group");
            const icon = grupo.querySelector(`[data-icon="${campo}"]`);
            const warn = grupo.querySelector(`[data-warn="${campo}"]`);
            const mensaje = "La estatura debe estar entre 50 y 250 cm";

            // Validar que tenga solo números y esté en el rango fisiológico aceptado
            const valido = regex.test(valor) && numero >= 50 && numero <= 250;

            actualizarEstado(valido, icon, warn, mensaje);
        }

        if (input.id === "restric_med") {

            validarTextoLibre(
                input,
                /^.{3,}$/, // al menos 3 caracteres, incluyendo espacios
                "Debe escribir al menos 3 caracteres"
            );
        }

    });





});

function validarTextoLibre(input, regex, mensajeError) {
    const campo = input.name.replace("[]", "");
    const grupo = input.closest(".form-group");
    const icon = grupo.querySelector(`[data-icon="${campo}"]`);
    const warn = grupo.querySelector(`[data-warn="${campo}"]`);

    const valor = input.value.trim();
    const valido = regex.test(valor);

    actualizarEstado(valido, icon, warn, mensajeError);
}

function actualizarEstado(valido, icon, warn, mensaje) {
    console.log(warn);

    if (valido) {
        icon.className = "icon-validate valid";
        icon.innerHTML = '<i class="fa-solid fa-check"></i>';
        warn.style.display = "none";
        warn.textContent = "";
    } else {
        icon.className = "icon-validate invalid";
        icon.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        warn.style.display = "block";
        warn.textContent = mensaje;
    }
}

function grabarPerfil() {
    const actividad = document.getElementById('actividad');
    const metas = document.getElementById('metas');
    const pesoInput = document.getElementById('peso');
    const estaturaInput = document.getElementById('estatura');
    const restricMedInput = document.getElementById('restric_med');

    let valido = true;
    let mensajes = [];

    // Validar selección de actividad (por seguridad)
    if (!actividad.value) {
        valido = false;
        mensajes.push("Debe seleccionar un nivel de actividad física");
    }

    // Validar selección de metas
    if (!metas.value) {
        valido = false;
        mensajes.push("Debe seleccionar una meta de entrenamiento");
    }

    // Validar peso (entre 30 y 150, hasta 3 decimales)
    const pesoVal = pesoInput.value.trim();
    const pesoNum = parseFloat(pesoVal);
    const regexPeso = /^(?:[1-9]\d{1,2})(?:\.\d{1,3})?$/;
    if (!regexPeso.test(pesoVal) || pesoNum < 30 || pesoNum > 150) {
        valido = false;
        mensajes.push("Peso inválido (debe estar entre 30 y 150 kg)");
    }

    // Validar estatura (entre 50 y 272 cm)
    const estaturaVal = estaturaInput.value.trim();
    const estaturaNum = parseInt(estaturaVal);
    const regexEstatura = /^\d{2,3}$/;
    if (!regexEstatura.test(estaturaVal) || estaturaNum < 50 || estaturaNum > 250) {
        valido = false;
        mensajes.push("Estatura inválida (debe estar entre 50 y 250 cm)");
    }

    // Validar restricción médica (mínimo 3 caracteres si se completa)
    const restricVal = restricMedInput.value.trim();
    console.log("restricVal", restricVal);
    if (restricVal.length < 3) {
        valido = false;
        mensajes.push("Debe ingresar al menos 3 caracteres. Si no tiene restriccione, escribir 'ninguna'");
    }

    // Mostrar resultado
    if (!valido) {
        const mensajeHTML = mensajes.map(msg => `• ${msg}`).join("<br>");
        mostrarModal("Formulario inválido", mensajeHTML, "warning", false);
    } else {
        //generar la contraseña y guardar todo en el BE
        //mandar al BE y rogar que sea success 
        mostrarModal("Perfil guardado", "Todos los campos han sido validados correctamente.", "success", false);
        mostrarModal("Importante!", "Por cuestiones de seguridad, se enviará la contraseña via mail. Por favor verificá tu casilla de correo. Cuando ingreses, puedes cambiar la contraseña en tu perfil", "info", true);
        setTimeout(() => {
            window.location.href = "./login_basico.html";
        }, 4000); // Espera 3 segundos

    }
}

/* **************************************************************/
/*document.addEventListener('DOMContentLoaded', function () {
    // Peso
    const pesoInput = document.getElementById('peso');
    const iconPeso = document.getElementById('icon-peso');
    const warnPeso = document.getElementById('warn-peso');
    pesoInput.addEventListener('input', function () {
        if (pesoInput.value.length === 0) {
            iconPeso.className = 'icon-validate';
            iconPeso.innerHTML = '';
            warnPeso.style.display = 'none';
            warnPeso.textContent = '';
            return;
        }
        if (/^\d{2,3}(\.\d{1,2})?$/.test(pesoInput.value)) {
            iconPeso.className = 'icon-validate valid';
            iconPeso.innerHTML = '<i class="fa-solid fa-check"></i>';
            warnPeso.style.display = 'none';
            warnPeso.textContent = '';
        } else {
            iconPeso.className = 'icon-validate invalid';
            iconPeso.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            warnPeso.style.display = 'block';
            warnPeso.textContent = 'Solo se pueden ingresar números o . seguido de un número';
        }
    });

    // Estatura (permite números y un punto para decimales)
    const estaturaInput = document.getElementById('estatura');
    const iconEstatura = document.getElementById('icon-estatura');
    const warnEstatura = document.getElementById('warn-estatura');

    estaturaInput.addEventListener('input', function () {
        if (estaturaInput.value.length === 0) {
            iconEstatura.className = 'icon-validate';
            iconEstatura.innerHTML = '';
            warnEstatura.style.display = 'none';
            warnEstatura.textContent = '';
            return;
        }
        if (/^\d{2,3}$/.test(estaturaInput.value)) {
            iconEstatura.className = 'icon-validate valid';
            iconEstatura.innerHTML = '<i class="fa-solid fa-check"></i>';
            warnEstatura.style.display = 'none';
            warnEstatura.textContent = '';
        } else {
            iconEstatura.className = 'icon-validate invalid';
            iconEstatura.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            warnEstatura.style.display = 'block';
            warnEstatura.textContent = 'Solo se pueden ingresar números';
        }
        // Restricciones médicas
        const restricMed = document.getElementById('restric_med');
        const warnRestricMed = document.getElementById('warn-restric_med');
        restricMed.addEventListener('input', function () {
            if (restricMed.value.trim().length === 0) {
                warnRestricMed.style.display = 'block';
                warnRestricMed.textContent = 'En caso de no poseer, escribir "ninguna"';
            } else {
                warnRestricMed.style.display = 'none';
                warnRestricMed.textContent = '';
            }
        });
        // Mostrar advertencia si el campo está vacío al cargar
        if (restricMed.value.trim().length === 0) {
            warnRestricMed.style.display = 'block';
            warnRestricMed.textContent = 'En caso de no poseer, escribir "ninguna"';
        }
    });
});

/*
function validarNombreApellido(valor) {
    // Solo letras y espacios, acepta acentos
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(valor);
}
function validarApellido(valor) {
    // Solo letras y espacios, acepta acentos
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(valor);
}*/
/*
document.addEventListener('DOMContentLoaded', function () {
    const nombreInput = document.getElementById('nombre');
    const iconNombre = document.getElementById('icon-nombre');
    const warnNombre = document.getElementById('warn-nombre');
    const apellidoInput = document.getElementById('apellido');
    const iconApellido = document.getElementById('icon-apellido');
    const warnApellido = document.getElementById('warn-apellido');
    const dniInput = document.getElementById('dni');
    const iconDni = document.getElementById('icon-dni');
    const warnDni = document.getElementById('warn-dni');
    const emailInput = document.getElementById('email');
    const iconEmail = document.getElementById('icon-email');
    const warnEmail = document.getElementById('warn-email');
    const phoneInput = document.getElementById('phone');
    const iconPhone = document.getElementById('icon-phone');
    const warnPhone = document.getElementById('warn-phone');

    nombreInput.addEventListener('input', function () {
        if (nombreInput.value.length === 0) {
            iconNombre.className = 'icon-validate';
            iconNombre.innerHTML = '';
            warnNombre.style.display = 'none';
            warnNombre.textContent = '';
            return;
        }


        if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/.test(nombreInput.value)) {
            iconNombre.className = 'icon-validate valid';
            iconNombre.innerHTML = '<i class="fa-solid fa-check"></i>';
            warnNombre.style.display = 'none';
            warnNombre.textContent = '';
        } else {
            iconNombre.className = 'icon-validate invalid';
            iconNombre.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            warnNombre.style.display = 'block';
            if (nombreInput.value.trim().length < 2) {
                warnNombre.textContent = 'El nombre debe tener por lo menos 2 caracteres';
            } else {
                warnNombre.textContent = 'No se pueden ingresar caracteres especiales';
            }

        }
    });

    apellidoInput.addEventListener('input', function () {
        if (apellidoInput.value.length === 0) {
            iconApellido.className = 'icon-validate';
            iconApellido.innerHTML = '';
            warnApellido.style.display = 'none';
            warnApellido.textContent = '';
            return;
        }
        if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/.test(apellidoInput.value)) {
            iconApellido.className = 'icon-validate valid';
            iconApellido.innerHTML = '<i class="fa-solid fa-check"></i>';
            warnApellido.style.display = 'none';
            warnApellido.textContent = '';
        } else {
            iconApellido.className = 'icon-validate invalid';
            iconApellido.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            warnApellido.style.display = 'block';
            if (nombreInput.value.trim().length < 2) {
                warnNombre.textContent = 'El apellido debe tener por lo menos 2 caracteres';
            } else {
                warnNombre.textContent = 'No se pueden ingresar caracteres especiales';
            }
        }
    });
    dniInput.addEventListener('input', function () {
        if (dniInput.value.length === 0) {
            iconDni.className = 'icon-validate';
            iconDni.innerHTML = '';
            warnDni.style.display = 'none';
            warnDni.textContent = '';
            return;
        }
        if (/^\d+$/.test(dniInput.value)) {
            iconDni.className = 'icon-validate valid';
            iconDni.innerHTML = '<i class="fa-solid fa-check"></i>';
            warnDni.style.display = 'none';
            warnDni.textContent = '';
        } else {
            iconDni.className = 'icon-validate invalid';
            iconDni.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            warnDni.style.display = 'block';
            warnDni.textContent = 'Solo se pueden ingresar números';
        }
    });
    emailInput.addEventListener('input', function () {
        if (emailInput.value.length === 0) {
            iconEmail.className = 'icon-validate';
            iconEmail.innerHTML = '';
            warnEmail.style.display = 'none';
            warnEmail.textContent = '';
            return;
        }
        // Simple validation: must have @ and .com
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value) && emailInput.value.includes('.com')) {
            iconEmail.className = 'icon-validate valid';
            iconEmail.innerHTML = '<i class="fa-solid fa-check"></i>';
            warnEmail.style.display = 'none';
            warnEmail.textContent = '';
        } else {
            iconEmail.className = 'icon-validate invalid';
            iconEmail.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            warnEmail.style.display = 'block';
            warnEmail.textContent = 'Email inválido';
        }
    });

    // Teléfono: solo números y guiones permitidos
    phoneInput.addEventListener('input', function () {
        if (phoneInput.value.length === 0) {
            iconPhone.className = 'icon-validate';
            iconPhone.innerHTML = '';
            warnPhone.style.display = 'none';
            warnPhone.textContent = '';
            return;
        }
        // Solo números y guiones
        if (/^[0-9\-]+$/.test(phoneInput.value)) {
            iconPhone.className = 'icon-validate valid';
            iconPhone.innerHTML = '<i class="fa-solid fa-check"></i>';
            warnPhone.style.display = 'none';
            warnPhone.textContent = '';
        } else {
            iconPhone.className = 'icon-validate invalid';
            iconPhone.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            warnPhone.style.display = 'block';
            warnPhone.textContent = 'Solo se pueden ingresar números y guiones';
        }
    });

});
// *******************************************************************
function validarTextoLibre(input, regex, mensajeError) {
    const campo = input.name.replace("[]", "");
    const grupo = input.closest(".form-group");
    const icon = grupo.querySelector(`[data-icon="${campo}"]`);
    const warn = grupo.querySelector(`[data-warn="${campo}"]`);

    const valor = input.value.trim();
    const valido = regex.test(valor);

    actualizarEstado(valido, icon, warn, mensajeError);
}

function actualizarEstado(valido, icon, warn, mensaje) {
    if (valido) {
        icon.className = "icon-validate valid";
        icon.innerHTML = '<i class="fa-solid fa-check"></i>';
        warn.style.display = "none";
        warn.textContent = "";
    } else {
        icon.className = "icon-validate invalid";
        icon.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        warn.style.display = "block";
        warn.textContent = mensaje;
    }
}
//**************************************************** */
/*document.addEventListener('DOMContentLoaded', function () {
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const dniInput = document.getElementById('dni');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const pesoInput = document.getElementById('peso');
    const estaturaInput = document.getElementById('estatura');

    document.getElementById('form-registro').addEventListener('submit', function (e) {
        let valido = true;
        let mensajes = [];

        // Nombre
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/.test(nombreInput.value)) valido = false;
        // Apellido
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/.test(apellidoInput.value)) valido = false;
        // DNI
        if (!/^\d+$/.test(dniInput.value)) valido = false;
        if (dniInput.value.length > 8) {
            valido = false;
            mensajes.push("El DNI no puede tener más de 8 números.");
        }
        // Email
        if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value) && emailInput.value.includes('.com'))) valido = false;
        // Teléfono
        if (!/^[0-9\-]+$/.test(phoneInput.value)) valido = false;
        // Teléfono: máximo 10 números (sin contar guiones)
        const phoneDigits = phoneInput.value.replace(/\D/g, '');
        if (phoneDigits.length > 10) {
            valido = false;
            mensajes.push("El teléfono no puede tener más de 10 números.");
        }
        // Peso: mínimo 40, máximo 160
        const peso = parseFloat(pesoInput.value);
        if (isNaN(peso) || peso < 40 || peso > 160) {
            valido = false;
            mensajes.push("El peso debe ser entre 40 y 160 kg.");
        }
        // Estatura: mínimo 100, máximo 270
        const estatura = parseInt(estaturaInput.value);
        if (isNaN(estatura) || estatura < 100 || estatura > 270) {
            valido = false;
            mensajes.push("La estatura debe ser entre 100 y 270 cm.");
        }

        if (!valido) {
            e.preventDefault();
            // Mostrar modal de error
            let mensajeFinal = mensajes.length > 0 ? mensajes.join("<br>") : "Hay errores en el formulario.";
            const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
            document.getElementById('exampleModalBody').innerHTML = mensajeFinal;
            modal.show();
        }
        // Si es válido, el form se enviará normalmente y avanzará a login_perfil.html
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
    const iconPassword = document.getElementById('icon-password');
    const warnPassword = document.getElementById('warn-password');

    passwordInput.addEventListener('input', function () {
        if (passwordInput.value.length === 0) {
            iconPassword.className = 'icon-validate';
            iconPassword.innerHTML = '';
            warnPassword.style.display = 'none';
            warnPassword.textContent = '';
            return;
        }
        // Ejemplo: mínimo 6 caracteres
        if (passwordInput.value.length >= 6) {
            iconPassword.className = 'icon-validate valid';
            iconPassword.innerHTML = '<i class="fa-solid fa-check"></i>';
            warnPassword.style.display = 'none';
            warnPassword.textContent = '';
        } else {
            iconPassword.className = 'icon-validate invalid';
            iconPassword.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            warnPassword.style.display = 'block';
            warnPassword.textContent = 'La contraseña debe tener al menos 6 caracteres';
        }
    });
});*/