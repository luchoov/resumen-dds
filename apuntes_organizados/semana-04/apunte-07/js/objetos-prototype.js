// declaro un nuevo tipo de objeto
function Persona(nombre, correo, profesion, fechaNacimiento) {
    this.nombre = nombre;
    this.correo = correo;
    this.profesion = profesion;
    this.fechaNacimiento = fechaNacimiento;
    this.saludar = function () {
        console.log('Hola soy ' + this.nombre);
    };
    this.edad = function () {
        const hoy = new Date();
        return hoy.getFullYear() - this.fechaNacimiento.getFullYear();
    };
}

// declaro un nuevo tipo de objeto con funciona anonima (es lo mismo que arriba)
// var Persona = function(nombre, correo, profesion) {
//     this.nombre = nombre;
//     this.correo = correo;
//     this.profesion = profesion;
//     this.saludar = function () {
//         console.log('Hola soy ' + this.nombre);
//     };
// }

//Instancio objetos de tipo Persona
const mario = new Persona('Mario', 'mario@gmail.com', 'Ingeniero Químico', new Date(1990, 9, 1));
const carla = new Persona('Carla', 'carla@gmail.com', 'Ingeniero en Sistemas de Información', new Date(2012, 9, 1));

console.log(' ====================== Objetos Persona ======================');
console.log('mario', mario);
console.log('carla', carla);


console.log(' ====================== Verificamos tipo dato ======================');
console.log('tipo de datos de mario:', typeof mario); // aunque es de tipo Persona, sigue siendo de tipo object implicitamente

// saludos
console.log(' ====================== Saludos ======================');
mario.saludar();
carla.saludar();

// edades
console.log(' ====================== Edades ======================');
console.log('Edad mario:', mario.edad());
console.log('Edad carla:', carla.edad());


// Ejemplos con protoype
console.log('\n\n====================== Ejemplos con protoype en Persona ======================');
Persona.prototype.esMayorDeEdad = function () {
    // if (this.edad() > 18)
    //     return true;
    // return false
    return this.edad() > 18;
};
console.log('====================== ¿Es mayor de edad? ======================');
console.log('¿mario es mayor de edad? :', mario.esMayorDeEdad());
console.log('¿carla es mayor de edad?:', carla.esMayorDeEdad());

console.log('\n\n====================== Ejemplos con protoype en carla ======================');
carla.__proto__.esMayorDeEdad = function () {
    return false;
};
console.log('====================== ¿Es mayor de edad? ======================');
console.log('¿mario es mayor de edad? :', mario.esMayorDeEdad());
console.log('¿carla es mayor de edad?:', carla.esMayorDeEdad());
