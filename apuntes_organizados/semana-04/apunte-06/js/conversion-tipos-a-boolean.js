"use strict";

const edad = 18;
const nombre = "Clara";
const cantidad = 0;
const segundoNombre = "";

// Convertir a boolean...

// 1. Un number a boolean usando Boolean()
let edadBoolean = Boolean(edad);
let cantidadBoolean = Boolean(cantidad);

console.log(`edadBoolean: ${edadBoolean} (${typeof edadBoolean})`);
console.log(`cantidadBoolean: ${cantidadBoolean} (${typeof cantidadBoolean})`);

// 2. Un string a boolean usando Boolean()
let nombreBoolean = Boolean(nombre);
let segundoNombreBoolean = Boolean(segundoNombre);

console.log(`nombreBoolean: ${nombreBoolean} (${typeof nombreBoolean})`);
console.log(
    `segundoNombreBoolean: ${segundoNombreBoolean} (${typeof segundoNombreBoolean})`
);

// 3. Mala práctica:
// Es probable que encuentres esta forma de convertir a número en código que leas
// No es una buena práctica: entre otras razones por ser poco clara

let booleano1 = !!723;
let booleano2 = !!"";

console.log(`booleano1: ${booleano1} (${typeof booleano1})`);
console.log(`booleano2: ${booleano2} (${typeof booleano2})`);
