document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formContacto');
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        limpiarErrores();
        let esValido = true;
        if (nombre === "") {mostrarError('nombre', "El nombre es obligatorio"); esValido = false;}
        if (email === "") {mostrarError('email', "El correo es obligatorio"); esValido = false;} else if (!validarFormatoEmail(email)) {mostrarError('email', "El formato del correo no es válido"); esValido = false;}
        if (mensaje === "") {mostrarError('mensaje', "No puedes enviar un mensaje vacío"); esValido = false;}
        if (esValido) {alert("¡Muchas gracias, " + nombre + "! Tu mensaje ha sido enviado."); formulario.reset();}
    });
    function mostrarError(idCampo, textoMensaje){const campo=document.getElementById(idCampo);campo.classList.add('input-error');const errorDiv=document.createElement('div');errorDiv.className='error-mensaje';errorDiv.innerText=textoMensaje;campo.parentElement.appendChild(errorDiv)}
    function limpiarErrores(){document.querySelectorAll('.error-mensaje').forEach(e=>e.remove());document.querySelectorAll('input, textarea').forEach(c=>c.classList.remove('input-error'))}
    function validarFormatoEmail(correo){const filtro=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return filtro.test(correo)}
});
