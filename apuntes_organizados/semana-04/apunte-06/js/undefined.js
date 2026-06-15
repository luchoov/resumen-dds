'use strict'

let titulo // Una variable no inicializada es del tipo undefined

console.log(`titulo: ${titulo} (${typeof titulo})`)

// Podemos evaluar si es undefined de esta manera
if (titulo === undefined){
    console.log('la variable titulo no tiene valor')
}

// O usando typeof
if (typeof titulo === 'undefined'){
    console.log('la variable titulo no tiene valor')
}

// Esta última forma puede ser más conveniente porque nos permite también
// incluir el caso en que la variable no está declarada
if (typeof nuncaLaDeclaramos === 'undefined'){
    console.log('la variable nuncaLaDeclaramos no tiene valor')
}
