const http = require("node:http");
const rick = require("./rick.json");
const p = process.env.PORT ?? 1234;

const server = http.createServer((req, res) => {
  const { url, method } = req;

  //GET , PUT , POST , DELETE
  switch (method) {
    case "GET":
      switch (url) {
        case "/":
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end("<h1>Si</h1>");
          break;

        case "/personajes/rick":
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(rick));
          break;

        default:
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end("<h1>404</h1>");
          break;
      }
      break;
    case "POST":
      switch (url) {
        case "/personajes":
          let body = "";

          req.on("data", (chunk) => {
            body += chunk;
          });

          req.on("end", () => {
            const data = JSON.parse(body);
            data.apellido = "Potes";
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
          });
          break;

        default:
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end("<h1>404</h1>");
          break;
      }
      break;
    default:
      res.statusCode = 404;
      res.end("No existe este metodo");
  }
});

server.listen(p, () => {
  console.log(`Servidor escuchando en el puerto: http://localhost:${p}`);
});
