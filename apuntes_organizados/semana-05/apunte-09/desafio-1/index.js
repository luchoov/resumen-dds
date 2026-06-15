"use strict";

import seedrandom from "seedrandom";

// Establecer la semilla
var random = seedrandom(1763519);

// Generar 1000 números aleatorios en un array.
let numerosAleatorios = Array.from({ length: 100 }, () => random.int32());

// Demostración de forEach para iterar sobre los elementos del array.
console.log("Demostración de join: {" + numerosAleatorios.join(", ") + "}");

// Demostración de filter para buscar los números positivos
console.log("Cantidad de positivos", numerosAleatorios.filter(value => value > 0).length);
