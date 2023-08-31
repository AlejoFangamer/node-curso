import express from "express";
import { require } from "./utils.js";

const users = require("./usuarios.json");

const app = express();

app.use(express.json());

app.get("/" ,(req,res) => {
  res.send("<h1>👁️</h1>");
})

app.get("/usuarios",(req,res) => {
  if (users <= 0) {
    return res.status(404).json({
      error: "No hay usuarios"
    });
  }
  return res.json(users)
})

app.get("/usuarios/:id",(req,res) => {
  const usuario = users.find((user) => user.id == parseInt(req.params.id));
  if (!usuario){
    return res.status(404).json({
      error: "Usuario no encontrado :("
    });
  }
  return res.json(usuario)
});

app.post

app.use((req,res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  });
})

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor escuchando en: http://localhost:${port}`)
})