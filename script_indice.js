window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    
    // Le damos un pequeño retraso de 1 segundo para que se aprecie la animación
    setTimeout(function() {
        loader.classList.add('loader-hidden');
    }, 1000);
});
