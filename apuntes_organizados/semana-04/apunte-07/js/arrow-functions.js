// declaro un nuevo tipo de objeto
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


obtenerPersonaMasGrande = function (p1, p2, p3) {
    let mayor = p1;
    if (p2.edad() > p1.edad())
        mayor = p2;
    else {
        if (p3.edad() > p1.edad())
            mayor = p3;
    }
    console.log('Soy una function/metodo común. Atte obtenerPersonaMasGrande');
    return mayor;
};

// arrow function completa
obtenerPersonaMasGrandeArrow = (p1, p2, p3) => {
    let mayor = p1;
    if (p2.edad() > p1.edad())
        mayor = p2;
    else {
        if (p3.edad() > p1.edad())
            mayor = p3;
    }
    console.log('Soy una arrow function. Atte obtenerPersonaMasGrandeArrow');
    return mayor;
};

//Instancio objetos de tipo Persona
const mario = new Persona('Mario', 'mario@gmail.com', 'Ingeniero Químico', new Date(1990, 9, 1));
const carla = new Persona('Carla', 'carla@gmail.com', 'Ingeniero en Sistemas de Información', new Date(2012, 9, 1));
const juan = new Persona('Juan', 'juan@gmail.com', 'Ingeniero en Sistemas de Información', new Date(1994, 9, 1));

console.log(' ====================== Objetos Persona ======================');
console.log('mario', mario);
console.log('carla', carla);
console.log('juan', juan);


console.log('\n\n====================== Funciones comunes: Obtener Persona mayor ======================');
const mayor = obtenerPersonaMasGrande(mario, juan, carla);
console.info(`El mayor entre mario, juan y ana es ${mayor.nombre} y tiene ${mayor.edad()} años`);

console.log('====================== Arrow Functions: Obtener Persona mayor ======================');
const mayorAF = obtenerPersonaMasGrandeArrow(mario, juan, carla);
console.info(`El mayor entre mario, juan y ana es ${mayorAF.nombre} y tiene ${mayorAF.edad()} años`);


