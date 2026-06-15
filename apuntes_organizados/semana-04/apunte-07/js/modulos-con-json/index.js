const personas = require('./acceso-a-datos/personas.datos.js');
const personasServicio = require('./logica-de-negocio/personas.servicio.js');

console.log('=================== Personas ===============');
console.table(personas);


// console.log('\n\n=================== Llamadas a funciones ===============');
// const mayores = personasServicio.mayoresDeEdad(personas);
// console.log('=================== Mayores de edad ===============');
// console.log('mayores', mayores);
//
//
// console.log('\n=================== Superheroes ===============');
// const superheroes = personasServicio.personasXProfesion(personas, 'superheroe');
// console.log('superheroes', superheroes);
// const medicosClinicos = personasServicio.personasXProfesion(personas, 'Médico clínico');
// console.log('\n=================== Médicos clínico ===============');
// console.log('medicosClinicos', medicosClinicos);
//
//
// console.log('\n=================== obtenerPersonaMasGrande ===============');
// console.log('obtenerPersonaMasGrande', personasServicio.obtenerPersonaMasGrande(personas));


console.log('\n=================== obtener profesiones ===============');
console.log('obtenerPersonaMasGrande', personasServicio.obtenerProfesiones(personas));
