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
io.on("connection", socket => {
  console.log("User connected", socket.id)

  socket.on("joinRoom", room => {
    socket.join(room);
    console.log(`${socket.id} ingresó a la sala ${room}`)
  })

})

// -- EXPORTAR
export default server;
