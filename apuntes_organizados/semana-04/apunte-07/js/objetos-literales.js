// ejemplo con persona
const juan = {
    nombre: 'Juan',
    correo: 'juan@gmail.com',
    profesion: 'Comerciante',
    fechaNacimiento: new Date(1994, 9, 1),
    saludar: function () {
        console.log('Hola soy ' + this.nombre);
    }
};

const mario = {
    nombre: 'Mario',
    correo: 'mario@gmail.com',
    profesion: 'Ingeniero Químico',
    fechaNacimiento: new Date(1990, 9, 1),
    saludar: function () {
        console.log('Hola soy ' + this.nombre);
    }
};

const carla = {
    nombre: 'Carla',
    correo: 'carla@gmail.com',
    profesion: 'Ingeniero en Sistemas de Información',
    fechaNacimiento: new Date(2012, 9, 1),
    saludar: function () {
        console.log('Hola soy ' + this.nombre);
    }
};

console.log(' ====================== Objetos ======================');
console.log('juan', juan);
console.log('mario', mario);
console.log('carla', carla);


console.log(' ====================== Tipo de dato? ¿son de tipo Persona? ======================');
console.log('tipo de datos de juan:', typeof juan);
console.log('tipo de datos de mario:', typeof mario);

// saludos
console.log(' ====================== Saludos ======================');
juan.saludar();
mario.saludar();
carla.saludar();


// Ejemplos con Object
const marisa = new Object();
marisa.nombre = 'Marisa';
marisa.correo = 'marisa@gmail.com';
marisa.profesion = 'Comerciante';
marisa.saludar = function () {
    console.log('Hola soy ' + this.nombre);
};

console.log(' ====================== Objetos con Object ======================');
console.log('marisa', marisa);

console.log(' ====================== Objetos con Object: Tipo de dato? ¿son de tipo Persona? ======================');
console.log('tipo de datos de marisa:', typeof marisa);

// saludos
console.log(' ====================== Objetos con Object: Saludos ======================');
marisa.saludar();
