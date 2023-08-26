/*
Módulo process (Gestión de procesos):

1 Argumentos de línea de comandos:
Utiliza los argumentos de línea de comandos para mostrar por consola el mensaje "Hola {nombre}" donde {nombre} es el argumento que se pasa al ejecutar el script desde la terminal.

2 Salir del proceso:
Muestra un mensaje de despedida cuando el proceso haya finalizado.

3 Entorno del proceso:
Muestra por consola el valor de una variable de entorno específica para mostrar el mensaje "Estamos en desarrollo" cuando el valor de NODE_ENV sea "development" y "Estamos en producción" cuando sea "production".

4 Utiliza la sintaxis de commonJS.

5 Finalmente crea un script en el package.json que ejecute el código utilizando node (npm run saludar)

Ejemplo de ejecución:
$ npm run saludar "Fabian Gomez"
Hola Fabian Gomez
Estamos en desarrollo
Adios el proceso ha terminado!
*/

require("dotenv").config();
const process = require("node:process");

process.on("exit", () => {
  console.log("Adios el proceso ha terminado!");
});

if (!process.argv[2] || process.argv.length > 3){
  console.log("Coloca un nombre porfavor")
  process.exit(1);
}

console.log(process.argv0);
console.log(`Hola ${process.argv[2]}!`);

if (process.env.NODE_ENV) {
  console.log("Estás en modo desarrollo");
}else{
  console.log("Estás en modo de producción");
}

process.exit(0); // Termina el proceso bien