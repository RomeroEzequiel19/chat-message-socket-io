const mostrarHistorialMensajes = (messagesList) => {
  messagesList.forEach((messagesList) => {
    const container = document.createElement("div");
    const nombre = document.createElement("p");
    const item = document.createElement("li");
    nombre.textContent = `${messagesList.user}`;
    item.textContent = `${messagesList.msg}`;

    // Agregar el mensaje y usuario al contenedor
    container.appendChild(nombre);
    container.appendChild(item);

    if (user === usuario) {
      container.classList.add("own-message");
    } else {
      container.classList.add("other-message");
    }

    // Agregar el contenedor a la lista
    messages.appendChild(container);
  });
  window.scrollTo(0, document.body.scrollHeight);
};

const nuevoMensaje = (messagesList) => {
  const ultimoMensaje = messagesList[messagesList.length - 1];
  const container = document.createElement("div");
  const nombre = document.createElement("p");
  const item = document.createElement("li");
  nombre.textContent = `${ultimoMensaje.user}`;
  item.textContent = `${ultimoMensaje.msg}`;

  container.appendChild(nombre);
  container.appendChild(item);

  if (ultimoMensaje.user === usuario) {
    container.classList.add("own-message");
  } else {
    container.classList.add("other-message");
  }

  messages.appendChild(container);
  window.scrollTo(0, document.body.scrollHeight);
};

// Logica para mostrar historial de mensajes
if ("connection") {
  socket.on("historial", (messagesList) => {
    mostrarHistorialMensajes(messagesList);
  });
}
// Logica para recibir nuevos mensajes
socket.on("chat message", (messagesList) => {
  nuevoMensaje(messagesList);
});
