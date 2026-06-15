"use strict";

const readlineSync = require("readline-sync");
const chalk = require("chalk");

let nSesion = 0;
while (true) {
    console.log(
        chalk.blue(
            `\n${"_".repeat(20)}  Sesion: ${++nSesion}   ${"_".repeat(20)}`
        )
    );
    let operador = leerOperador();

    if (operador === "x") {
        console.log(
            chalk.blue(`\n${"_".repeat(19)}`),
            chalk.magenta(" ¡Hasta pronto! "),
            chalk.blue(`${"_".repeat(19)}`)
        );
        break;
    }

    let valorA = leerValor("A");
    let valorB = leerValor("B");
    let resultado = calcularResultado(operador, valorA, valorB);

    if (resultado !== undefined) {
        console.log(
            chalk.green(`${valorA} ${operador} ${valorB} = ${resultado}`)
        );
    } else {
        console.warn(chalk.red("Se produjo un error"));
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
