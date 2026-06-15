let array = ['hola', 3.14, true];
console.log('array:', array);

array = new Array(3); //Crea tres posiciones, donde cada elemento tiene como valor por defecto `undefined`
console.log('array con elementos undefine', array);

array = new Array('hola', 3.14, true);
console.log('array:', array);

// Manipulando arrays
console.log('\n\n========================= Manipulando arrays =================================');
const numeros = [1, 35, 6, 54, 13, 3, 24];
// console.log('array numeros', numeros)
// console.log('primero elemento de numeros', numeros[0])
// console.log('índice no válido de numeros', numeros[129])
// // agrego nuevo elemento al final
// numeros.push(65)
// console.log('nuevo elemento al final de numeros', numeros[7])
// // agrego nuevo elemento al principio de numeros
// numeros.unshift(34)
// console.log('nuevo elemento al final de numeros', numeros[0])
console.log(`El array números tiene ${numeros.length} elementos`);


// Iterando arrays
// console.log('\n\n========================= Iterando arrays: Forma tradicional =====================');
// // iterar elementos forma tradicional
// for (const numero of numeros) {
//     console.log(numero)
// }

// arrow function de una linea
console.log('\n\n================== Iterando arrays: Funciones de array ==========================');
numeros.forEach(e => console.log(e));

console.log('=================== Iterando arrays: Funciones de array utilizando sobrecarga de foreach ===============');
// arrow function, sobrecarga del foreach
numeros.forEach((e, i) => console.log(`Posición ${i} esta almacenado el elemento ${e}`));


console.log('=================== Iterando arrays: filtrar elementos ===============');
// arrow function, sobrecarga del foreach
const mayoresA10 = numeros.filter((e) => e > 10);
console.log(`Mayores a 10`, mayoresA10);
console.log(`Numeros`, numeros);
console.log(`La cantidad de elementos mayores a 10 son ${mayoresA10.length}`);

console.log('=================== Iterando arrays: Mapear elementos ===============');
let mapeados = numeros.map((e) => e * 10);
console.log(`elementos mapeados`, mapeados);
console.log(`La cantidad de elementos mayores a 10 son ${mapeados.length}`);

console.log('=================== Iterando arrays: Mapear elementos, ejemplo 2 ===============');
mapeados = numeros.map((e) => {
    if (e > 10)
        return e * 10;
    return 0;
});
console.log(`elementos mapeados`, mapeados);
console.log(`La cantidad de elementos mayores a 10 son ${mapeados.length}`);