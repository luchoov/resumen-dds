import { Entidad } from './entidad.js';

export class Provincia extends Entidad {
    nombre;

    constructor(id, nombre) {
        super(id);
        this.nombre = nombre;
    }

}