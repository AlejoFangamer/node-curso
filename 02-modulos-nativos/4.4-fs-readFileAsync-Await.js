const fs = require("node:fs");

async function main() {
  try {
    console.log("Leyendo...");
    const archivo = await fs.readFile("./texto.txt","utf-8");
    console.log(archivo);
  } catch (error) {
    console.log(error);
  }
}

main();