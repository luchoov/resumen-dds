"use strict";

const readlineSync = require("readline-sync");

let operador = readlineSync.question("Ingresá el operador (+, -, *, /): ");
let valorA = Number(readlineSync.question("Ingresá el primer valor (A): "));
let valorB = Number(readlineSync.question("Ingresá el segundo valor (B): "));
let resultado;

switch (operador) {
    case "+":
        resultado = valorA + valorB;
        break;
    case "-":
        resultado = valorA - valorB;
        break;
    case "*":
        resultado = valorA * valorB;
        break;
    case "/":
        resultado = valorA / valorB;
        break;
}

if (resultado !== undefined) {
    console.log(`${valorA} ${operador} ${valorB} = ${resultado}`);
} else {
    console.warn("Se produjo un error");
}
