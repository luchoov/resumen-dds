"use strict";

const readlineSync = require("readline-sync");

while (true) {
    let operador = readlineSync.question(
        "\nIngresá el operador (+, -, *, /) o 'x' para salir: "
    );

    if (operador === "x") {
        console.log("¡Hasta pronto!");
        break;
    }

    let valorA = Number(readlineSync.question("Ingresá el primer valor (A): "));
    let valorB = Number(
        readlineSync.question("Ingresá el segundo valor (B): ")
    );
    let resultado = calcularResultado(operador, valorA, valorB);

    if (resultado !== undefined) {
        console.log(`${valorA} ${operador} ${valorB} = ${resultado}\n`);
    } else {
        console.warn("Se produjo un error\n");
    }
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
