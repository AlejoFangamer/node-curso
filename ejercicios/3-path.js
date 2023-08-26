/*
Módulo path (Manipulación de rutas):

1 Unión de rutas:
Utiliza el método join para crear una ruta absoluta a un archivo llamado archivo.txt dentro de la carpeta archivos. Muestra en consola la ruta absoluta.

2 Obtener nombre de archivo:
Utiliza el método basename para obtener el nombre del archivo de la ruta creada en el ejercicio anterior. Muestra en consola el nombre del archivo.

3 Obtener extensión de archivo:
Utiliza el método extname para obtener la extensión del archivo de la ruta creada en el ejercicio anterior. Muestra en consola la extensión del archivo.

4 Obtener directorio de archivo:
Utiliza el método dirname para obtener el directorio del archivo de la ruta creada en el ejercicio anterior. Muestra en consola el directorio del archivo.

5 Utiliza Commonjs

6 Finalmente crea un script en el package.json que ejecute el código utilizando node (npm run path)

7. Utiliza chalk para darle color a la salida de consola. (opcional)

Ejemplo de ejecución:
$ npm run path
Ruta absoluta:
/home/fabian37/projects/node-curso/ejercicios/archivos/archivo.txt
Nombre del archivo:
archivo.txt
Extensión del archivo:
.txt
Directorio del archivo:
archivos

*/

const path = require("node:path");
const NombreCarpeta = "archivos";

const ruta = path.join(__dirname, NombreCarpeta, "archivo.txt");

const nombreArchivo = path.basename(ruta);
const extension = path.extname(ruta);
const directorio = path.dirname(ruta);

console.log("\n", "Ruta absoluta:");
console.log(ruta);

console.log("\n", "Nombre del archivo:");
console.log(nombreArchivo);

console.log("\n", "Extensión del archivo:");
console.log(extension);

console.log("\n", "Directorio del archivo:");
console.log(directorio);
