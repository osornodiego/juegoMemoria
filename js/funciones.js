// Variables globales
const d = document;
let imgN1 = [
    { nombre: "pera", url: "imagenes/pera.jpg" },
    { nombre: "pina", url: "imagenes/pina.jpg" },
    { nombre: "guayaba", url: "imagenes/guayaba.jpg" },
    { nombre: "fresa", url: "imagenes/fresa.jpg" },
    { nombre: "papaya", url: "imagenes/papaya.jpg" },
    { nombre: "banano", url: "imagenes/banano.jpg" },
    { nombre: "maracuya", url: "imagenes/maracuya.jpg" },
    { nombre: "mango", url: "imagenes/mango.jpg" },
    { nombre: "pera", url: "imagenes/pera.jpg" },
    { nombre: "pina", url: "imagenes/pina.jpg" },
    { nombre: "guayaba", url: "imagenes/guayaba.jpg" },
    { nombre: "fresa", url: "imagenes/fresa.jpg" },
    { nombre: "papaya", url: "imagenes/papaya.jpg" },
    { nombre: "banano", url: "imagenes/banano.jpg" },
    { nombre: "maracuya", url: "imagenes/maracuya.jpg" },
    { nombre: "mango", url: "imagenes/mango.jpg" },
];
let imgN2 = [
    { nombre: "sandia", url: "imagenes/sandia.jpeg" },
    { nombre: "limon", url: "imagenes/limon.jpeg" },
    { nombre: "uva", url: "imagenes/uva.jpeg" },
    { nombre: "kiwi", url: "imagenes/kiwi.jpeg" },
    { nombre: "manzana", url: "imagenes/manzana.jpeg" },
    { nombre: "durazno", url: "imagenes/durazno.jpeg" },
    { nombre: "cereza", url: "imagenes/cereza.jpeg" },
    { nombre: "melon", url: "imagenes/melon.jpg" },
    { nombre: "sandia", url: "imagenes/sandia.jpeg" },
    { nombre: "limon", url: "imagenes/limon.jpeg" },
    { nombre: "uva", url: "imagenes/uva.jpeg" },
    { nombre: "kiwi", url: "imagenes/kiwi.jpeg" },
    { nombre: "manzana", url: "imagenes/manzana.jpeg" },
    { nombre: "durazno", url: "imagenes/durazno.jpeg" },
    { nombre: "cereza", url: "imagenes/cereza.jpeg" },
    { nombre: "melon", url: "imagenes/melon.jpg" },
];
let imgN3 = [
    { nombre: "fresa", url: "imagenes/fresa.jpg" },
    { nombre: "platano", url: "imagenes/platano.jpeg" },
    { nombre: "papaya", url: "imagenes/papaya.jpg" },
    { nombre: "mango", url: "imagenes/mango.jpg" },
    { nombre: "arandano", url: "imagenes/arandano.jpeg" },
    { nombre: "granada", url: "imagenes/granada.jpeg" },
    { nombre: "frambuesa", url: "imagenes/frambuesa.jpeg" },
    { nombre: "coco", url: "imagenes/coco.jpeg" },
    { nombre: "fresa", url: "imagenes/fresa.jpg" },
    { nombre: "platano", url: "imagenes/platano.jpeg" },
    { nombre: "papaya", url: "imagenes/papaya.jpg" },
    { nombre: "mango", url: "imagenes/mango.jpg" },
    { nombre: "arandano", url: "imagenes/arandano.jpeg" },
    { nombre: "granada", url: "imagenes/granada.jpeg" },
    { nombre: "frambuesa", url: "imagenes/frambuesa.jpeg" },
    { nombre: "coco", url: "imagenes/coco.jpeg" },
];

let nombreImg = [];
let posImg = [];
let aciertos = 0;
let intentos = 0;
let nivel = 1;
let tiempo;
let tiempoTranscurrido;
let estoyJugando = false;
let jugador = "";

// Elementos del DOM
const tablero = d.querySelector(".tablero");
const mostrarNivel = d.querySelector(".nivel");
const mostrarIntentos = d.querySelector(".intentos");
const mostrarAciertos = d.querySelector(".aciertos");
const mostrarTiempo = d.querySelector(".tiempo");
const mostrarJugador = d.querySelector("#mostrarJugador");
const btnIniciar = d.querySelector(".btn-iniciar");

// Efectos de sonido
const sonidoAcierto = new Audio("sonidos/correcto.mp3");
const sonidoError = new Audio("sonidos/errorsonido.mp3");
const sonidoFinalNivel = new Audio("sonidos/finish.mp3");
const sonido10Segundos = new Audio("sonidos/10segundos.mp3");

// Función inicial al cargar el DOM
d.addEventListener("DOMContentLoaded", () => {
    jugador = prompt("Ingresa tu nombre para comenzar:");
    if (!jugador) {
        jugador = "Jugador Anónimo";
    }
    mostrarJugador.textContent = jugador;
    actualizarIndicadores();
});

// Evento del botón para iniciar el juego
btnIniciar.addEventListener("click", () => {
    if (!estoyJugando) {
        iniciarNivel();
    }
});

// Función para iniciar un nivel
function iniciarNivel() {
    estoyJugando = true;
    limpiarTablero();
    definirTiempoNivel();
    agregarImagenes();
    tiempoDeJuego();
}

// Función para definir el tiempo según el nivel
function definirTiempoNivel() {
    if (nivel === 1) {
        tiempo = Infinity; // Tiempo ilimitado
    } else if (nivel === 2) {
        tiempo = 90;
    } else if (nivel === 3) {
        tiempo = 60;
    }
}

// Función para agregar imágenes al tablero
function agregarImagenes() {
    const imgNivel = nivel === 1 ? imgN1 : nivel === 2 ? imgN2 : imgN3;
    imgNivel.sort(() => Math.random() - 0.5);
    imgNivel.forEach((img, i) => {
        const div = d.createElement("div");
        div.className = "col-3";
        const imagen = d.createElement("img");
        imagen.className = "img-fluid";
        imagen.src = "imagenes/ocultar.jpg";
        imagen.dataset.index = i;
        imagen.addEventListener("click", mostrarImagenes);
        div.appendChild(imagen);
        tablero.appendChild(div);
    });
}

// Función para mostrar imágenes seleccionadas
function mostrarImagenes() {
    const imagenID = this.dataset.index;
    if (posImg.includes(imagenID)) return;

    const imgNivel = nivel === 1 ? imgN1 : nivel === 2 ? imgN2 : imgN3;
    this.src = imgNivel[imagenID].url;
    nombreImg.push(imgNivel[imagenID].nombre);
    posImg.push(imagenID);

    if (nombreImg.length === 2) {
        setTimeout(compararImagenes, 500);
    }
}

// Función para comparar imágenes seleccionadas
function compararImagenes() {
    const imagenesTablero = d.querySelectorAll(".tablero img");
    if (nombreImg[0] === nombreImg[1] && posImg[0] !== posImg[1]) {
        sonidoAcierto.play();
        alert(`¡Bien hecho, ${jugador}! Encontraste una pareja. Sigue así 🍍🍓`);
        imagenesTablero[posImg[0]].src = "imagenes/ok.png";
        imagenesTablero[posImg[1]].src = "imagenes/ok.png";
        imagenesTablero[posImg[0]].removeEventListener("click", mostrarImagenes);
        imagenesTablero[posImg[1]].removeEventListener("click", mostrarImagenes);
        aciertos++;
        mostrarAciertos.textContent = aciertos;

        if (nivel === 1 && aciertos === 8 || nivel === 2 && aciertos === 8 || nivel === 3 && aciertos === 8) {
            finalizarNivel();
        }
    } else {
        sonidoError.play();
        alert(`¡Oh no, ${jugador}! Las imágenes no coinciden. Intenta nuevamente 🍌🍉`);
        imagenesTablero[posImg[0]].src = "imagenes/ocultar.jpg";
        imagenesTablero[posImg[1]].src = "imagenes/ocultar.jpg";
    }
    resetSeleccion();
}

// Función para reiniciar selección de imágenes
function resetSeleccion() {
    nombreImg = [];
    posImg = [];
    intentos++;
    mostrarIntentos.textContent = intentos;
}

// Función para manejar el tiempo del juego
function tiempoDeJuego() {
    tiempoTranscurrido = setInterval(() => {
        if (tiempo !== Infinity) {
            tiempo--;
            mostrarTiempo.textContent = tiempo;
            if (tiempo === 10) {
                mostrarAlertaTiempo();
            }
            if (tiempo <= 0) {
                clearInterval(tiempoTranscurrido);
                alert(`¡Se acabó el tiempo, ${jugador}! Intenta nuevamente 🍊⏳`);
                reiniciarJuego();
            }
        }
    }, 1000);
}

// Función para mostrar alerta de 10 segundos
function mostrarAlertaTiempo() {
    sonido10Segundos.play();
    const alerta = d.createElement("div");
    alerta.textContent = "⚠️ ¡Solo quedan 10 segundos!";
    alerta.className = "alert alert-danger text-center";
    document.body.appendChild(alerta);
    setTimeout(() => alerta.remove(), 5000);
}

// Función para finalizar el nivel
function finalizarNivel() {
    clearInterval(tiempoTranscurrido);
    sonidoFinalNivel.play();
    alert(`🎉 ¡Felicidades, ${jugador}! Completaste el nivel ${nivel}. Vamos al siguiente 🍇`);
    nivel++;
    if (nivel > 3) {
        alert(`🎉 ¡Increíble, ${jugador}! Completaste todos los niveles 🍓🍍`);
        reiniciarJuego();
    } else {
        resetNivel();
    }
}

// Función para reiniciar el nivel
function resetNivel() {
    definirTiempoNivel();
    aciertos = 0;
    intentos = 0;
    estoyJugando = false;
    actualizarIndicadores();
    limpiarTablero();
}

// Función para reiniciar el juego completo
function reiniciarJuego() {
    nivel = 1;
    resetNivel();
}

// Función para limpiar el tablero
function limpiarTablero() {
    tablero.innerHTML = "";
}

// Función para actualizar indicadores del juego
function actualizarIndicadores() {
    mostrarNivel.textContent = nivel;
    mostrarIntentos.textContent = intentos;
    mostrarAciertos.textContent = aciertos;
    mostrarTiempo.textContent = tiempo === Infinity ? "∞" : tiempo;
}
