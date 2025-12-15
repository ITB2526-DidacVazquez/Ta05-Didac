// Esperamos a que todo el HTML esté cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Seleccionamos el formulario por su ID
    const formulario = document.getElementById('formContacto');

    // 2. Escuchamos cuando el usuario intenta enviar el formulario (evento 'submit')
    formulario.addEventListener('submit', function(evento) {
        
        // Detenemos el envío automático para poder validar nosotros
        evento.preventDefault();

        // 3. Obtenemos los valores que escribió el usuario
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        // 4. Limpiamos errores anteriores (si los hubiera)
        limpiarErrores();

        // 5. Validaciones
        let esValido = true;

        if (nombre === "") {
            mostrarError('nombre', "El nombre es obligatorio");
            esValido = false;
        }

        if (email === "") {
            mostrarError('email', "El correo es obligatorio");
            esValido = false;
        } else if (!validarFormatoEmail(email)) {
            mostrarError('email', "El formato del correo no es válido");
            esValido = false;
        }

        if (mensaje === "") {
            mostrarError('mensaje', "No puedes enviar un mensaje vacío");
            esValido = false;
        }

        // 6. Si todo está correcto, enviamos
        if (esValido) {
            alert("¡Muchas gracias, " + nombre + "! Tu mensaje ha sido enviado.");
            formulario.reset(); // Limpia el formulario
        }
    });

    // Función para mostrar mensajes de error en el HTML
    function mostrarError(idCampo, textoMensaje) {
        const campo = document.getElementById(idCampo);
        campo.classList.add('input-error'); // Ponemos el borde rojo (definido en CSS)
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-mensaje';
        errorDiv.innerText = textoMensaje;
        campo.parentElement.appendChild(errorDiv);
    }

    // Función para limpiar los errores antes de volver a validar
    function limpiarErrores() {
        const errores = document.querySelectorAll('.error-mensaje');
        errores.forEach(e => e.remove());
        
        const campos = document.querySelectorAll('input, textarea');
        campos.forEach(c => c.classList.remove('input-error'));
    }

    // Función mágica para saber si un email tiene el formato @ correcto
    function validarFormatoEmail(correo) {
        const filtro = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return filtro.test(correo);
    }
});
