import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "node:http";
import db from "./src/config/db.js";
import indexRouter from "./src/routes/index.router.js";
import { joinRoomHandler } from "./src/handlers/joinRoom.handler.js";
import { chatMessageHandler } from "./src/handlers/chatMessage.handler.js";
import { disconnectHandler } from "./src/handlers/disconnect.handler.js";
import { verifyJWTSocket } from "./src/middlewares/verifyJwt.socket.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.set("port", process.env.PORT || 4000);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  },
});

app.use("/", indexRouter);

app.use("*", (req, res) => {
  res.send("Esta ruta no existe en la API");
});

const onConnection = (socket) => {
  console.log("cliente conectado");
  joinRoomHandler(io, socket);
  chatMessageHandler(io, socket);
  disconnectHandler(io, socket);
};

io.on("connection", onConnection);

//Empieza servidor
server.listen(app.get("port"), () => {
  console.log("Servidor corriendo en puerto", app.get("port"));
});

//Conexion a db
db.connect()
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.log("Error conectando base de datos: ", err);
  });
