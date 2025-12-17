const canvas = document.getElementById('juegoCanvas');
const ctx = canvas.getContext('2d');

// Configuración del jugador
let jugador = {
    x: 50,
    y: 300,
    ancho: 30,
    alto: 30,
    color: "#e91e63", // Rojo Mario
    velocidadX: 0,
    velocidadY: 0,
    saltando: false,
    gravedad: 0.8,
    fuerzaSalto: -15
};

// Definición de plataformas (x, y, ancho, alto)
const plataformas = [
    { x: 0, y: 380, ancho: 800, alto: 20 },   // Suelo
    { x: 200, y: 280, ancho: 150, alto: 20 }, // Plataforma 1
    { x: 450, y: 200, ancho: 150, alto: 20 }, // Plataforma 2
    { x: 700, y: 120, ancho: 50, alto: 20 }   // Meta
];

// Controles
let teclas = {};

window.addEventListener('keydown', (e) => teclas[e.code] = true);
window.addEventListener('keyup', (e) => teclas[e.code] = false);

function actualizar() {
    // Movimiento lateral
    if (teclas['ArrowLeft']) jugador.velocidadX = -5;
    else if (teclas['ArrowRight']) jugador.velocidadX = 5;
    else jugador.velocidadX = 0;

    // Salto
    if (teclas['Space'] && !jugador.saltando) {
        jugador.velocidadY = jugador.fuerzaSalto;
        jugador.saltando = true;
    }

    // Aplicar gravedad
    jugador.velocidadY += jugador.gravedad;
    jugador.x += jugador.velocidadX;
    jugador.y += jugador.velocidadY;

    // Colisión con el suelo y plataformas
    jugador.saltando = true;
    plataformas.forEach(plat => {
        if (jugador.x < plat.x + plat.ancho &&
            jugador.x + jugador.ancho > plat.x &&
            jugador.y < plat.y + plat.alto &&
            jugador.y + jugador.alto > plat.y) {
            
            // Si cae sobre la plataforma
            if (jugador.velocidadY > 0) {
                jugador.saltando = false;
                jugador.y = plat.y - jugador.alto;
                jugador.velocidadY = 0;
            }
        }
    });

    // Límites de la pantalla
    if (jugador.x < 0) jugador.x = 0;
    if (jugador.x > canvas.width - jugador.ancho) jugador.x = canvas.width - jugador.ancho;

    // Condición de victoria
    if (jugador.x > 700 && jugador.y < 120) {
        alert("¡Nivel Completado!");
        jugador.x = 50;
        jugador.y = 300;
    }
}

function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar Jugador
    ctx.fillStyle = jugador.color;
    ctx.fillRect(jugador.x, jugador.y, jugador.ancho, jugador.alto);

    // Dibujar Plataformas
    ctx.fillStyle = "#4caf50"; // Verde tierra
    plataformas.forEach(plat => {
        ctx.fillRect(plat.x, plat.y, plat.ancho, plat.alto);
    });

    // Dibujar Meta
    ctx.fillStyle = "gold";
    ctx.fillRect(710, 80, 30, 40);

    requestAnimationFrame(buclePrincipal);
}

function buclePrincipal() {
    actualizar();
    dibujar();
}

buclePrincipal();
