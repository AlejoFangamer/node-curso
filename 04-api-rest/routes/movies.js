import { Router } from "express";
import { require } from "../utils.js";
import { ValidarPeliculas, ValidarPeliculasParcial } from "../Esquema/pelis.js";
import crypto from "node:crypto";

const movies = require("./pelis.json");

export const moviesRouter = Router();

moviesRouter.get("/", (req,res) => {
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
})

moviesRouter.get("/:id", (req, res) => {
  const usuario = movies.find((user) => user.id == req.params.id);
  if (!usuario) {
    return res.status(404).json({
      error: "Pelicula no encontrada :(",
    });
  }
  return res.json(usuario);
});

moviesRouter.post("/", (req, res) => {
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

moviesRouter.patch("/:id", (req, res) => {
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

moviesRouter.delete("/:id", (req, res) => {
  const indicePelicula = movies.findIndex((nombre) => nombre.id == req.params.id);

  if (indicePelicula === -1) {
    return res.status(204).send();
  }

  movies.splice(indicePelicula, 1);

  return res.json({ message: "Movie deleted" });
});