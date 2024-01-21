import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { onConnection } from "./src/handlers/indexHandler.js";
import db from "./src/config/db.js";
import indexRouter from "./src/routes/index.router.js";

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
