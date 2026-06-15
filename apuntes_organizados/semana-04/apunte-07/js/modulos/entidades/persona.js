export class Persona {
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