// Genera número aleatorio entre 1 y 100
let numeroSecreto = Math.floor(Math.random() * 100) + 1;

// Inicializa variables
let intentos = 0;
const maxIntentos = 10;
let juegoTerminado = false;
let historialIntentos = [];

// Referencias al DOM
const formulario = document.getElementById("formulario");
const inputNumero = document.getElementById("inputNumero");
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");
const listaHistorial = document.getElementById("historial");
const botonReiniciar = document.getElementById("reiniciar");

// Evento al enviar el formulario
formulario.addEventListener("submit", function(event) {
  event.preventDefault();

  if (juegoTerminado) return;

  const numeroUsuario = parseInt(inputNumero.value);
  if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > 100) {
    mostrarMensaje("Introduce un número válido entre 1 y 100", "error");
    return;
  }

  intentos++;
  contador.textContent = intentos;
  historialIntentos.push(numeroUsuario);
  actualizarHistorial();

  if (numeroUsuario === numeroSecreto) {
    mostrarMensaje(`¡Correcto! El número era ${numeroSecreto}.`, "exito");
    juegoTerminado = true;
  } else if (numeroUsuario < numeroSecreto) {
    mostrarMensaje("Demasiado bajo...", "error");
  } else {
    mostrarMensaje("Demasiado alto...", "error");
  }

  if (intentos >= maxIntentos && numeroUsuario !== numeroSecreto) {
    mostrarMensaje(`Has perdido. El número era ${numeroSecreto}.`, "error");
    juegoTerminado = true;
  }

  inputNumero.value = "";
});

// Mostrar mensaje con clase según tipo
function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = `mensaje ${tipo}`;
}

// Mostrar historial de intentos en lista <ul>
function actualizarHistorial() {
  listaHistorial.innerHTML = "";
  historialIntentos.forEach((num, index) => {
    const li = document.createElement("li");
    li.textContent = `Intento ${index + 1}: ${num}`;
    listaHistorial.appendChild(li);
  });
}

// Reiniciar el juego
botonReiniciar.addEventListener("click", function() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  intentos = 0;
  juegoTerminado = false;
  historialIntentos = [];

  contador.textContent = "0";
  mensaje.textContent = "";
  mensaje.className = "mensaje";
  listaHistorial.innerHTML = "";
  inputNumero.value = "";
});