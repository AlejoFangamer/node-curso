const express = require('express');
const rick = require("./rick.json");

const app = express();
app.use(express.json());

app.get("/", (req,res) => {
  res.send("<h1>Holiiii</h1>");
});

app.get("/personajes/rick", (req,res) => {
  res.json(rick);
});

app.use((res,req) => {
  res.status(404).send("<h1>Chupelo Payo</h1>");
})

const p = process.env.PORT ?? 3000;
app.listen(p, () => {
  console.log(`Servidor escuchando en el puerto: http://localhost:${p}`);
});
