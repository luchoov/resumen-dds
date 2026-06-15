'use strict'
/*
 * En ES6 declaramos variables usando let y const
 * let: para variables cuyo valor cambia en el transcurso del programa 
 * const: para constantes, es decir, variables cuyo valor no cambia
 */

// Declarar variables y constantes

let nombre              // Podemos declarar simplemente una variable
nombre = 'Juan'         // Y asignarla luego

let puntaje = 96.5      // O inicializarla al declararla

// const LEGAJO         // No podemos simplemente declarar una constante sin inicializarla
const LEGAJO = 9894399 


// También se puede declarar variables usando var

var estilo = 'vieja escuela'

// Esta es una alternativa historicamente anterior para ambas let y const
// y tiene un comportamiento diferente a let y const
// Para entender este comportamiento que puede ser un poco extraño o confuso a priori,
// es necesario entender los conceptos de alcance (scope)[1] y elevación (hoisting)[2]
// Si te interesa podés conocer un poco más acá: 
// [1] https://developer.mozilla.org/es/docs/Glossary/Scope
// [2] https://developer.mozilla.org/es/docs/Glossary/Hoisting

var estilo              // Podemos volver a declarar una variable declarada con var

//var nombre            // En cambio no podemos redeclarar una variable declarada con let o const
//let nombre      
