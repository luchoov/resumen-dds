import { Entidad } from './entidad.js';

export class Tipologia extends Entidad {
    nombre;
    descripcion

    constructor(id, nombre, descripcion) {
        super(id);
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

}