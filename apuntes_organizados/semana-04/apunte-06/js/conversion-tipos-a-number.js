"use strict";

const nombre = "Clara";
const edad = 18;
const numeroCuentaString = "993400";
const esCliente = true;

// Convertir a Number ...

// 1. Un string a Number
let numeroCuentaNumber1 = Number(numeroCuentaString);

console.log(
    `numeroCuentaNumber1: ${numeroCuentaNumber1} (${typeof numeroCuentaNumber1})`
);

// 2. Una expresión string a Number
let saldo = Number("100" + ".99");

console.log(`saldo: ${saldo} (${typeof saldo})`);

// 3. Un string que no evalúa a number a Number
let noEsUnNumero = Number(nombre);

// La variable noEsUnNumero es de tipo Number
// Pero su contenido es NaN (Not A Number)
console.log(`noEsUnNumero: ${noEsUnNumero} (${typeof noEsUnNumero})`);

// 4. Un booleano a Number
let condicion = Number(esCliente);

console.log(`condicion: ${condicion} (${typeof condicion})`);

// 5. Mala práctica: operador unario
// Es probable que encuentres esta forma de convertir a número en código que leas
// No es una buena práctica: entre otras razones por ser poco clara
let numeroCuentaNumber2 = +numeroCuentaString;

console.log(
    `numeroCuentaNumber2: ${numeroCuentaNumber2} (${typeof numeroCuentaNumber2})`
);

// 6. Los métodos parseInt() y parseFloat() también nos permiten convertir a Number
let monto = parseFloat("34.55");
let cantidad = parseInt("237");

console.log(`monto: ${monto} (${typeof monto})`);
console.log(`cantidad: ${cantidad} (${typeof cantidad})`);
