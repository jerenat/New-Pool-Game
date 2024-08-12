// -- LIBRERÍAS

// -- Dependencias
import express from "express";              // -- framework
import http from "http";                    // solicitudes http
import path from "path";                    // para ubicar carpetas
import { fileURLToPath } from "url";        // convierte carpetas en enlaces
import cors from "cors";                    // permitir agentes externos
import cookieParser from "cookie-parser";   // parsear cookies
import { Server } from "socket.io";           // salas, tiempo real

// -- Locales
import authRoutes from "./routes/auth.routes.js";
import indexRoutes from "./routes/index.routes.js";
import postRoutes from "./routes/posts.routes.js";

// -- VARIABLES GLOBALES
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// -- crear renderizador
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// -- Cors credentials
app.use(
  cors({
    credentials: true,
  })
);

// -- Rutas estáticas
app.use("/public", express.static(path.join(__dirname, "/views/public/")));

// -- Middlewares
app.use("/api", authRoutes);
app.use("/api", postRoutes);
app.use(indexRoutes);





// -- socket.io
let currentTurn = 0;  // 0 para el jugador 1, 1 para el jugador 2
let interval;

io.on("connection", socket => {

  socket.on("joinRoom", room => {
    socket.join(room);
    console.log(`${socket.id} ingresó a la sala ${room}`);

    const numClients = io.sockets.adapter.rooms.get(room)?.size || 0;
    const listClients = Array.from(io.sockets.adapter.rooms.get(room));

    if (numClients < 2) {
      console.log("Waiting for other player...");
    } else if (numClients == 2) {

      // Notificar a los clientes que el juego comienza
      io.to(room).emit("gameStart", { message: "Game started", turn: listClients[currentTurn] });

      // Alternar turnos cada 20 segundos
      interval = setInterval(() => {
        currentTurn = (currentTurn + 1) % 2;
        io.to(room).emit("turn", { turn: listClients[currentTurn] });
      }, 20000);
    } else if (numClients > 2) {
      socket.emit("server_message", "maximus");
      console.log(`La sala ${room} está llena`);
    }
  });

  // Escuchar los datos de "update" del jugador
  socket.on("update", data => {
    const room = [...socket.rooms][1]; // Obtener el ID de la sala
    const listClients = Array.from(io.sockets.adapter.rooms.get(room));
    
    // Determinar el oponente
    const opponentId = listClients.find(id => id !== socket.id);

    // Enviar los datos al oponente si es su turno
    if (socket.id === listClients[currentTurn]) {
      io.to(opponentId).emit("update", data);
    }
  });

  socket.on("leaveRoom", room => {
    socket.leave(room);
    console.log(`${socket.id} salió a la sala ${room}`);
    
    const numClients = io.sockets.adapter.rooms.get(room)?.size || 0;
    if (numClients < 2 && interval) {
      clearInterval(interval);
    }
  });

  socket.on("disconnect", () => {
    if (interval) {
      clearInterval(interval);
    }
    console.log("User disconnected", socket.id);
  });
});






// -- EXPORTAR
export default server;
