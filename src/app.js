import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";
import { indexRouter } from "./routes/index.routes.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const __dirname = path.resolve();

app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

//Routes
app.use(indexRouter);

//Arreglo para cargar usuario y mensaje
const messagesList = [];

const cargarArray = (user, msg) => {
  const mensajeObjeto = {
    user: user,
    msg: msg,
  };

  messagesList.push(mensajeObjeto);
};

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
  console.log("Server running http://localhost:3000");
});
