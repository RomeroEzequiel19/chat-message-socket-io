//Asigno los elementos a variables
const input = document.getElementById("input");
const usernameDisplay = document.getElementById("username-display");
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const user = document.getElementById("user");

//crear una conexión de socket
const socket = io();

//Solicito usuario
const usuario = prompt("Ingrese su nombre de Usuario, por favor");
user.textContent = `Usuario: ${usuario}`;

//Emitir Usuario conectado
socket.emit("user connected", usuario);

// Escucha el evento "input" en el campo de entrada
input.addEventListener("keydown", () => {
  // Emitir un evento al servidor
  socket.emit("key pressed");
});

// Función para mostrar el nombre de usuario
const showUsername = (username) => {
  usernameDisplay.textContent = `${username} está escribiendo...`;
};

socket.on("key pressed", (username) => {
  if (username !== usuario) {
    showUsername(username);
    window.scrollTo(0, document.body.scrollHeight);
    // Establecer un temporizador para eliminar el mensaje después de 1 segundo
    setTimeout(() => {
      usernameDisplay.textContent = "";
    }, 1000);
  }
});

//Logica del formulario
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});
