import { Departamento } from '../entidades/departamento.js';
import { Farmacia } from '../entidades/farmacia.js';
import { Localidad } from '../entidades/localidad.js';
import { Provincia } from '../entidades/provincia.js';
import { Tipologia } from '../entidades/tipologia.js';

import farmaciasJson from './listado-establecimiento-farmacias-refar-201908.json' assert {type: 'json'};


function parseLocalidad(farmaciaJson) {
    const provincia = new Provincia(farmaciaJson.provincia_id, farmaciaJson.provincia_nombre);
    const departamento = new Departamento(farmaciaJson.departamento_id, farmaciaJson.departamento_nombre, provincia);
    const localidad = new Localidad(farmaciaJson.localidad_id, farmaciaJson.localidad_nombre, departamento);
    return localidad;
}

function parseTipologia(farmaciaJson) {
    const tipologia = new Tipologia(farmaciaJson.tipologia_id, farmaciaJson.tipologia_nombre, farmaciaJson.tipologia);
    return tipologia;
}

function parseFarmacia(farmaciaJson, localidad, tipologia) {
    const farmacia = new Farmacia(farmaciaJson.establecimiento_id);
    farmacia.nombre = farmaciaJson.establecimiento_nombre;
    farmacia.localidad = localidad;
    farmacia.codLoc = farmaciaJson.cod_loc;
    farmacia.codEnt = farmaciaJson.cod_ent;
    farmacia.origenFinanciamiento = farmaciaJson.origen_financiamiento;
    farmacia.tipologia = tipologia;
    farmacia.cp = farmaciaJson.cp;
    farmacia.domicilio = farmaciaJson.domicilio;
    farmacia.sitioWeb = farmaciaJson.sitio_web;
    return farmacia;
}

function getFarmacias() {
    const farmacias = [];

    //diferencias con el for in
    for (const farmaciaJson of farmaciasJson) {
        const localidad = parseLocalidad(farmaciaJson);
        const tipologia = parseTipologia(farmaciaJson);
        const farmacia = parseFarmacia(farmaciaJson, localidad, tipologia);
        farmacias.push(farmacia);
        // break
    }
    return farmacias;
}

export const farmacias = getFarmacias();
