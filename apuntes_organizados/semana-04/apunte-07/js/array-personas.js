class Persona {
    constructor(nombre, correo, profesion, fechaNacimiento) {
        this.nombre = nombre;
        this.correo = correo;
        this.profesion = profesion;
        this.fechaNacimiento = fechaNacimiento;
    }

    saludar() {
        console.log('Hola soy ' + this.nombre);
    }

    edad() {
        const hoy = new Date();
        return hoy.getFullYear() - this.fechaNacimiento.getFullYear();
    }

    esMayorDeEdad() {
        // if (this.edad() > 18)
        //     return true;
        // return false
        return this.edad() > 18;
    };
}

const mario = new Persona('Mario', 'mario@gmail.com', 'Ingeniero Químico', new Date(1990, 9, 1));
const carla = new Persona('Carla', 'carla@gmail.com', 'Ingeniero en Sistemas de Información', new Date(2012, 9, 1));
const juan = new Persona('Juan', 'juan@gmail.com', 'Ingeniero en Sistemas de Información', new Date(1994, 9, 1));

const personas = [mario, carla, juan]; //por que es const?
personas.push(new Persona('Maria', 'maria@gmail.com', 'Medico clínico', new Date(2016, 6, 1)));
personas.push(new Persona('Milagros', 'milagros@gmail.com', 'Vigilante', new Date(2015, 6, 1)));
personas.push(new Persona('Bruce', 'bruce@gmail.com', 'Superheroe', new Date(1990, 6, 1)));
personas.push(new Persona('Daniela', 'daniela@gmail.com', 'Superheroe', new Date(2000, 6, 1)));
personas.push(new Persona('Luis miguel', 'luismi@gmail.com', 'Cantante', new Date(1965, 6, 1)));

console.log('=================== Personas ===============');
console.log('personas', personas);

// >
// > 1- Personas mayores de edad: mayoresDeEdad(personas)
// >
// > 2- Persona cuya profesión sea una pasada por argumento, ej: personasXProfesion(personas, 'superheroe')
// >
// > 3- obtenerPersonaMasGrande(personas), tener en cuenta que ahora recibe como argumento un array con n personas.

// Funciones

//1- Personas mayores de edad: mayoresDeEdad(personas)
mayoresDeEdad = (personas) => {
    return personas.filter((persona) => persona.esMayorDeEdad());
};


const mayores = mayoresDeEdad(personas);
console.log('=================== Mayores de edad ===============');
console.log('mayores', mayores);

//2- Persona cuya profesión sea una pasada por argumento, ej: personasXProfesion(personas, 'superheroe')
personasXProfesion = (personas, profesion) => {
    return personas.filter(p => {
        return p.profesion.toLowerCase() === profesion.toLowerCase();
    });
};


console.log('=================== Superheroes ===============');
const superheroes = personasXProfesion(personas, 'superheroe');

console.log('superheroes', superheroes);

const medicosClinicos = personasXProfesion(personas, 'Médico clínico');
console.log('=================== Médicos clínico ===============');
console.log('medicosClinicos', medicosClinicos);


function obtenerPersonaMasGrande(personas) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // const personasOrdByEdadAsc = personas.sort((a, b) => {
    //     // 4 - 5 = -1
    //     return a.edad() - b.edad();
    // });
    const personasOrdByEdadAsc = personas.sort((a, b) => a.edad() - b.edad());
    return personasOrdByEdadAsc[personasOrdByEdadAsc.length - 1];
}

console.log('=================== obtenerPersonaMasGrande ===============');
console.log('obtenerPersonaMasGrande', obtenerPersonaMasGrande(personas));
