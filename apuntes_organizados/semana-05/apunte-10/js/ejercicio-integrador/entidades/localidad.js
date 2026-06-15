import { Entidad } from './entidad.js';

export class Localidad extends Entidad {
    nombre;
    departamento;

    constructor(id, nombre, departamento) {
        super(id);
        this.nombre = nombre;
        this.departamento = departamento;
    }

}