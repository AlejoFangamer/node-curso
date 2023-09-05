import express from "express";
import cors from "cors";
import { moviesRouter } from "./routes/movies.js";
import { usersRouter } from "./routes/users.js";

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

app.use("/movies", moviesRouter)
app.use("/usuarios", usersRouter)

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor escuchando en: http://localhost:${port}`);
});
