const fs = require("node:fs");

console.log("leyendo archivo...");
fs.readFile("./texto.txt","utf-8",(err,txt) => {
  if (err) throw err;
  console.log(txt);
})