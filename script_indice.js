window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    setTimeout(function() {
        loader.classList.add('loader-hidden');
    }, 900);

    // Simple search filter preserving structure
    window.filtrarProyectos = function(){
        const q = document.getElementById('inputBusqueda').value.toLowerCase();
        document.querySelectorAll('.proyecto-item').forEach(el=>{
            if(el.textContent.toLowerCase().includes(q)) el.style.display='block'; else el.style.display='none';
        })
    }
});
