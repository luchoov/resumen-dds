import { Entidad } from './entidad.js';

export class Departamento extends Entidad {
    nombre;
    provincia;

    constructor(id, nombre, provincia) {
        super(id);
        this.nombre = nombre;
        this.provincia = provincia;
    }

}