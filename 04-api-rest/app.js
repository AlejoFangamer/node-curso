import express from "express";
import crypto from "node:crypto";
import cors from "cors";
import { require } from "./utils.js";
import { ValidarPeliculas, ValidarPeliculasParcial } from "./Esquema/pelis.js";

const users = require("./usuarios.json");
const movies = require("./pelis.json");
let idCount = users.length;

const app = express();
app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
      const ORIGENES_ACEPTADOS = [
        "http://localhost:8080",
        "http://localhost:3000",
      ];

      if (ORIGENES_ACEPTADOS.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.disable("x-powered-by");



app.get("/", (req, res) => {
  res.send("<h1>👁️</h1>");
});

app.get("/usuarios", (req, res) => {
  if (users <= 0) {
    return res.status(404).json({
      error: "No hay usuarios",
    });
  }
  return res.json(users);
});

app.get("/usuarios/:id", (req, res) => {
  const usuario = users.find((user) => user.id == parseInt(req.params.id));
  if (!usuario) {
    return res.status(404).json({
      error: "Usuario no encontrado :(",
    });
  }
  return res.json(usuario);
});

app.post("/usuarios", (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ error: "Error en la peticion" });
  }
  const user = req.body;
  user.id = ++idCount;
  users.push(user);
  return res.status(201).json(user);
});

app.patch("/usuarios/:id", (req, res) => {
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

app.delete("/usuarios/:id", (req, res) => {
  const indiceEstudiante = users.findIndex(
    (nombre) => nombre.id == parseInt(req.params.id)
  );
  if (!users[indiceEstudiante]) {
    return res.status(204).send();
  }
  users.splice(indiceEstudiante, 1);
  return res.json(users);
});

//? ACTIVIDAD MOVIES

app.get("/movies", (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const peli = movies.filter(
      user => user.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    );
    if (!peli) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    return res.json(peli);
  }

  if (movies <= 0) {
    return res.status(404).json({
      error: "No se encontraron las peliculas",
    });
  }
  return res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const usuario = movies.find((user) => user.id == req.params.id);
  if (!usuario) {
    return res.status(404).json({
      error: "Pelicula no encontrada :(",
    });
  }
  return res.json(usuario);
});

app.post("/movies", (req, res) => {
  const result = ValidarPeliculas(req.body);
  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) });
  }

  const NuevaPeli = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  // if (!req.body.title || !req.body.director) {
  //   return res.status(400).json({ error: "Error en la peticion" });
  // }
  // const pelicula = req.body;
  // pelicula.id = crypto.randomUUID();
  movies.push(NuevaPeli);
  return res.status(201).json(NuevaPeli);
});

app.patch("/movies/:id", (req, res) => {
  const id = req.params.id;
  const result = ValidarPeliculasParcial(req.body);
  // Encontrar el indice del usuario en la db por su id

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const index = movies.findIndex((movie) => movie.id === id);
  // Si no existe ningun usuario con ese id
  if (index === -1) {
    return res.status(404).json({ error: "Pelicula no encontrada" });
  }

  const actualizarPeli = {
    ...movies[index],
    ...result.data,
  };

  movies[index] = actualizarPeli;

  return res.json(actualizarPeli);
});

app.delete("/movies/:id", (req, res) => {
  const indicePelicula = movies.findIndex((nombre) => nombre.id == req.params);

  if (indicePelicula === -1) {
    return res.status(204).send();
  }

  movies.splice(indicePelicula, 1);

  return res.json({ message: "Movie deleted" });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor escuchando en: http://localhost:${port}`);
});
