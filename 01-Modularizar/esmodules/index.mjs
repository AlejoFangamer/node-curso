import { estudiantes } from "./estudiantes.mjs";
import { despedirse , saludar } from "./saludos.mjs";

console.log(estudiantes);
saludar(estudiantes[1]);
despedirse(estudiantes[2]);