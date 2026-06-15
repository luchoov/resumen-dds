"use strict";

const readlineSync = require("readline-sync");

while (true) {
    console.log("\n");
    let operador = leerOperador();

    if (operador === "x") {
        console.log("¡Hasta pronto!");
        break;
    }

    let valorA = leerValor("A");
    let valorB = leerValor("B");
    let resultado = calcularResultado(operador, valorA, valorB);

    if (resultado !== undefined) {
        console.log(`${valorA} ${operador} ${valorB} = ${resultado}\n`);
    } else {
        console.warn("Se produjo un error\n");
    }
}

function leerOperador() {
    let operadoresValidos = "+-*/x";
    let operador = "";
    do {
        operador = readlineSync.question(
            "Ingresá el operador (+, -, *, /) o 'x' para salir: "
        );
    } while (
        !(operador.length === 1 && operadoresValidos.indexOf(operador) > -1)
    );
    return operador;
}

function leerValor(nombreVariable) {
    let valor;
    do {
        valor = readlineSync.question(`Ingresá el valor (${nombreVariable}): `);
    } while (isNaN(valor));
    return Number(valor);
}

function calcularResultado(operador, valorA, valorB) {
    let r;
    switch (operador) {
        case "+":
            r = valorA + valorB;
            break;
        case "-":
            r = valorA - valorB;
            break;
        case "*":
            r = valorA * valorB;
            break;
        case "/":
            r = valorA / valorB;
            break;
    }
    return r;
}
