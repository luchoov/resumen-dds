import { Entidad } from './entidad.js';

export class Farmacia extends Entidad {
    nombre;
    localidad
    codLoc;
    codEnt;
    origenFinanciamiento;
    tipologia;
    cp;
    domicilio;
    sitioWeb;


    constructor(id) {
        super(id);
        this.nombre = undefined;
        this.localidad = undefined;
        this.codLoc = undefined;
        this.codEnt = undefined;
        this.origenFinanciamiento = undefined;
        this.tipologia = undefined;
        this.cp = undefined;
        this.domicilio = undefined;
        this.sitioWeb = undefined;
    }

}