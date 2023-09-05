import { Router } from "express";
import { require } from "../utils.js";

const users = require("./usuarios.json");

export const usersRouter = Router();
let idCount = users.length;

usersRouter.get("/", (req, res) => {
  if (users <= 0) {
    return res.status(404).json({
      error: "No hay usuarios",
    });
  }
  return res.json(users);
});

usersRouter.get("/:id", (req, res) => {
  const usuario = users.find((user) => user.id == parseInt(req.params.id));
  if (!usuario) {
    return res.status(404).json({
      error: "Usuario no encontrado :(",
    });
  }
  return res.json(usuario);
});

usersRouter.post("/", (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ error: "Error en la peticion" });
  }
  const user = req.body;
  user.id = ++idCount;
  users.push(user);
  return res.status(201).json(user);
});

usersRouter.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // Encontrar el indice del usuario en la db por su id
  const index = users.findIndex((user) => user.id === id);
  // Si no existe ningun usuario con ese id
  if (index === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  } else {
    const userUpdated = { ...users[index], ...req.body };
    users[index] = userUpdated;
    res.json(userUpdated);
  }
});

usersRouter.delete("/:id", (req, res) => {
  const indiceEstudiante = users.findIndex(
    (nombre) => nombre.id == parseInt(req.params.id)
  );
  if (!users[indiceEstudiante]) {
    return res.status(204).send();
  }
  users.splice(indiceEstudiante, 1);
  return res.json(users);
});