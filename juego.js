const canvas = document.getElementById('juegoCanvas');
const ctx = canvas.getContext('2d');
const escala = 30; // Tamaño de cada cuadrado

// Definición de las piezas (Tetrominos)
const PIEZAS = [
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 0, 0], [1, 1, 1]], // L
    [[0, 0, 1], [1, 1, 1]], // J
    [[0, 1, 1], [1, 1, 0]], // S
    [[1, 1, 0], [0, 1, 1]]  // Z
];

const COLORES = [null, '#FF0D72', '#0DC2FF', '#0DFF72', '#F538FF', '#FF8E0D', '#FFE138', '#3877FF'];

let tablero = crearMatriz(10, 20);
let puntuacion = 0;

let piezaActual = {
    pos: {x: 3, y: 0},
    matriz: PIEZAS[Math.floor(Math.random() * PIEZAS.length)],
    color: Math.floor(Math.random() * (COLORES.length - 1)) + 1
};

function crearMatriz(w, h) {
    const matriz = [];
    while (h--) matriz.push(new Array(w).fill(0));
    return matriz;
}

function dibujarPieza(matriz, offset, colorIndex) {
    matriz.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctx.fillStyle = COLORES[colorIndex];
                ctx.fillRect((x + offset.x) * escala, (y + offset.y) * escala, escala - 1, escala - 1);
            }
        });
    });
}

function dibujarTablero() {
    tablero.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctx.fillStyle = COLORES[value];
                ctx.fillRect(x * escala, y * escala, escala - 1, escala - 1);
            }
        });
    });
}

function colision(tablero, pieza) {
    const [m, o] = [pieza.matriz, pieza.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 && (tablero[y + o.y] && tablero[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function integrar(tablero, pieza) {
    pieza.matriz.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                tablero[y + pieza.pos.y][x + pieza.pos.x] = pieza.color;
            }
        });
    });
}

function eliminarLineas() {
    let filasBorradas = 0;
    outer: for (let y = tablero.length - 1; y > 0; --y) {
        for (let x = 0; x < tablero[y].length; ++x) {
            if (tablero[y][x] === 0) continue outer;
        }
        const fila = tablero.splice(y, 1)[0].fill(0);
        tablero.unshift(fila);
        ++y;
        filasBorradas++;
    }
    if (filasBorradas > 0) {
        puntuacion += filasBorradas * 10;
        console.log("Puntuación:", puntuacion);
    }
}

function bajarPieza() {
    piezaActual.pos.y++;
    if (colision(tablero, piezaActual)) {
        piezaActual.pos.y--;
        integrar(tablero, piezaActual);
        resetPieza();
        eliminarLineas();
    }
    contadorCaida = 0;
}

function resetPieza() {
    piezaActual.matriz = PIEZAS[Math.floor(Math.random() * PIEZAS.length)];
    piezaActual.color = Math.floor(Math.random() * (COLORES.length - 1)) + 1;
    piezaActual.pos.y = 0;
    piezaActual.pos.x = 3;
    if (colision(tablero, piezaActual)) {
        tablero.forEach(row => row.fill(0)); // Game Over: limpia el tablero
        puntuacion = 0;
    }
}

function rotar(matriz) {
    for (let y = 0; y < matriz.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [matriz[x][y], matriz[y][x]] = [matriz[y][x], matriz[x][y]];
        }
    }
    matriz.forEach(row => row.reverse());
}

document.addEventListener('keydown', event => {
    if (event.keyCode === 37) { // Izquierda
        piezaActual.pos.x--;
        if (colision(tablero, piezaActual)) piezaActual.pos.x++;
    } else if (event.keyCode === 39) { // Derecha
        piezaActual.pos.x++;
        if (colision(tablero, piezaActual)) piezaActual.pos.x--;
    } else if (event.keyCode === 40) { // Abajo
        bajarPieza();
    } else if (event.keyCode === 38) { // Arriba (Rotar)
        rotar(piezaActual.matriz);
        if (colision(tablero, piezaActual)) rotar(piezaActual.matriz); // Deshacer si choca
    }
});

let contadorCaida = 0;
let intervaloCaida = 1000;
let tiempoAnterior = 0;

function actualizar(tiempo = 0) {
    const deltaTime = tiempo - tiempoAnterior;
    tiempoAnterior = tiempo;

    contadorCaida += deltaTime;
    if (contadorCaida > intervaloCaida) {
        bajarPieza();
    }

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    dibujarTablero();
    dibujarPieza(piezaActual.matriz, piezaActual.pos, piezaActual.color);
    
    // Dibujar puntuación
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + puntuacion, 10, 25);

    requestAnimationFrame(actualizar);
}

actualizar();
