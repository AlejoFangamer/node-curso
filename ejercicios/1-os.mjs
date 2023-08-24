/*
Módulo os (Información del sistema operativo):

1 Información del sistema operativo:
Muestra por consola el nombre de la plataforma, la arquitectura del sistema y la versión del sistema operativo.

2 Directorio de usuario:
Imprime por consola el directorio del usuario actual.

3 Muestra el resultado utilizando la sintaxis de ES Modules.

4 Utiliza la libreria chalk para personalizar los mensajes impresos en consola.

5 Finalmente crea un script en el package.json que ejecute el código utilizando node (npm run os)

Ejemplo de ejecución:
$ npm run os
1. Información del sistema operativo:
Plataforma: linux
Arquitectura: x64
Versión: 5.15.90.1-microsoft-standard-WSL2
---------------------------------------
2. Directorio de usuario:
/home/fabian
*/

import chalk from "chalk";
import os from "node:os";

const c = console.log;
const sep = "-".repeat(40);

c(chalk.bgYellow.black.bold.underline("Informacion del sistema operativo:"));
c(chalk.yellow.bold.italic("Plataforma:"), os.platform());
c(chalk.yellow.bold.italic("Arquitectura:"), os.arch());
c(chalk.yellow.bold.italic("Versión:"), os.version());
 
c(sep);

c(chalk.bgHex("#70B2FF").black.bold.underline("Directorio de usuario:"));
c(chalk.hex("#70B2FF").bold.italic(os.homedir()), `(${os.hostname()})`);
