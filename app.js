const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require("cors");
app.use(cors());

const messagesList = [];

const cargarArray = (user, msg) => {
  const mensajeObjeto = {
    user: user,
    msg: msg,
  };

  messagesList.push(mensajeObjeto);
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  
  //Recibo el nombre de usuario de quién se conectó
  socket.on("user connected", (username) => {
    // Almaceno el nombre de usuario asociado con el socket
    socket.username = username;
  });

  socket.on("key pressed", () => {
    io.emit("key pressed", socket.username);
  });

  // muestra historial de mensaje al usuario que se conectó
  socket.emit("historial", messagesList);

  socket.on("chat message", (msg) => {
    // Almacena el mensaje y usuario en el array
    cargarArray(socket.username, msg);

    io.emit("chat message", messagesList);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
