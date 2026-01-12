// Slightly adjusted Tetris game: preserved logic but scaled responsively
const canvas = document.getElementById('juegoCanvas');
const ctx = canvas.getContext('2d');
let escala = 30;
function ajustarCanvas(){
  const maxWidth = Math.min(360, window.innerWidth*0.8);
  escala = Math.floor(maxWidth / 10);
  canvas.width = escala*10;
  canvas.height = escala*20;
}
ajustarCanvas();
window.addEventListener('resize', ajustarCanvas);

// Tetrominos and colors (unchanged core logic)
const PIEZAS = [
    [[1, 1, 1, 1]],
    [[1, 1], [1, 1]],
    [[0, 1, 0], [1, 1, 1]],
    [[1, 0, 0], [1, 1, 1]],
    [[0, 0, 1], [1, 1, 1]],
    [[0, 1, 1], [1, 1, 0]],
    [[1, 1, 0], [0, 1, 1]]
];
const COLORES = [null, '#FF0D72', '#0DC2FF', '#0DFF72', '#F538FF', '#FF8E0D', '#FFE138', '#3877FF'];

let tablero = crearMatriz(10, 20);
let puntuacion = 0;

let piezaActual = crearNuevaPieza();

function crearMatriz(w, h) {const matriz = []; while (h--) matriz.push(new Array(w).fill(0)); return matriz;}
function crearNuevaPieza(){return {pos:{x:3,y:0},matriz:PIEZAS[Math.floor(Math.random()*PIEZAS.length)],color:Math.floor(Math.random()*(COLORES.length-1))+1}} 

function dibujar(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  tablero.forEach((row,y)=>{row.forEach((value,x)=>{if(value!==0){ctx.fillStyle=COLORES[value];ctx.fillRect(x*escala,y*escala,escala-1,escala-1)}})})
  dibujarPieza(piezaActual.matriz,piezaActual.pos,piezaActual.color)
}
function dibujarPieza(matriz, offset, colorIndex){matriz.forEach((row,y)=>row.forEach((value,x)=>{if(value!==0){ctx.fillStyle=COLORES[colorIndex];ctx.fillRect((x+offset.x)*escala,(y+offset.y)*escala,escala-1,escala-1)}}))}

function colision(tablero,pieza){const [m,o]=[pieza.matriz,pieza.pos];for(let y=0;y<m.length;++y){for(let x=0;x<m[y].length;++x){if(m[y][x]!==0&&(tablero[y+o.y]&&tablero[y+o.y][x+o.x])!==0)return true}}return false}
function integrar(tablero,pieza){pieza.matriz.forEach((row,y)=>row.forEach((value,x)=>{if(value!==0)tablero[y+pieza.pos.y][x+pieza.pos.x]=pieza.color}))}

function eliminarLineas(){let filasBorradas=0;outer:for(let y=tablero.length-1;y>=0;--y){for(let x=0;x<tablero[y].length;++x){if(tablero[y][x]===0)continue outer}const fila=tablero.splice(y,1)[0].fill(0);tablero.unshift(fila);++y;filasBorradas++}if(filasBorradas>0)puntuacion+=filasBorradas*10}

let dropCounter=0,dropInterval=1000,ultimo=0;
function actualizar(tiempo=0){const delta=tiempo-ultimo;ultimo=tiempo;dropCounter+=delta;if(dropCounter>dropInterval){piezaActual.pos.y++;if(colision(tablero,piezaActual)){piezaActual.pos.y--;integrar(tablero,piezaActual);piezaActual=crearNuevaPieza();eliminarLineas()}dropCounter=0}dibujar();requestAnimationFrame(actualizar)}
actualizar();

// Controles
window.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){piezaActual.pos.x--;if(colision(tablero,piezaActual))piezaActual.pos.x++}else if(e.key==='ArrowRight'){piezaActual.pos.x++;if(colision(tablero,piezaActual))piezaActual.pos.x--}else if(e.key==='ArrowDown'){piezaActual.pos.y++;if(colision(tablero,piezaActual)){piezaActual.pos.y--;integrar(tablero,piezaActual);piezaActual=crearNuevaPieza();eliminarLineas()}}else if(e.key==='ArrowUp'){rotar(piezaActual.matriz);if(colision(tablero,piezaActual)){rotar(piezaActual.matriz);rotar(piezaActual.matriz);rotar(piezaActual.matriz)}}})
function rotar(m){for(let y=0;y<m.length;y++){for(let x=0;x<y;x++){[m[x][y],m[y][x]]=[m[y][x],m[x][y]]}}m.forEach(row=>row.reverse())}
