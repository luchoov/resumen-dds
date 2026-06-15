import { Persona } from '../entidades/persona.js';

const mario = new Persona('Mario', 'mario@gmail.com', 'Ingeniero Químico', new Date(1990, 9, 1));
const carla = new Persona('Carla', 'carla@gmail.com', 'Ingeniero en Sistemas de Información', new Date(2012, 9, 1));
const juan = new Persona('Juan', 'juan@gmail.com', 'Ingeniero en Sistemas de Información', new Date(1994, 9, 1));

let personas = [mario, carla, juan]; //por que es const?
personas.push(new Persona('Maria', 'maria@gmail.com', 'Medico clínico', new Date(2016, 6, 1)));
personas.push(new Persona('Milagros', 'milagros@gmail.com', 'Vigilante', new Date(2015, 6, 1)));
personas.push(new Persona('Bruce', 'bruce@gmail.com', 'Superheroe', new Date(1990, 6, 1)));
personas.push(new Persona('Daniela', 'daniela@gmail.com', 'Superheroe', new Date(2000, 6, 1)));
personas.push(new Persona('Luis miguel', 'luismi@gmail.com', 'Cantante', new Date(1965, 6, 1)));


// console.log('=================== Personas ===============');
// console.log(personas);


// Casos de prueba, en ningun caso deberia explotar
// personas = undefined; // falla
// personas = []; // ok
// personas.push(new Persona('Luis miguel', 'luismi@gmail.com', 234324, new Date(1965, 6, 1))); // falla
// personas.push(new Persona('Luis miguel', 'luismi@gmail.com',  'Momia', new Date(1500, 6, 1))); // ???
export { personas };