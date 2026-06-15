"use strict";

const edad = 18;
const esCliente = true;

// Convertir a string...

// 1. Un number a string usando String()
let edadString1 = String(edad);

console.log(`edadString1: ${edadString1} (${typeof edadString1})`);

// 2. Un number a string usando .toString()
let edadString2 = edad.toString();

console.log(`edadString2: ${edadString2} (${typeof edadString2})`);

// 3. Un booleano a string
let condicion = String(esCliente);

console.log(`condicion: ${condicion} (${typeof condicion})`);

// 4. Mala práctica:
// Es probable que encuentres esta forma de convertir a número en código que leas
// No es una buena práctica: entre otras razones por ser poco clara
let cantidad = "" + 723;

console.log(`cantidad: ${cantidad} (${typeof cantidad})`);
