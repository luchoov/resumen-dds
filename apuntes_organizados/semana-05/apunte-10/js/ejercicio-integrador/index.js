import { farmacias } from './acceso-a-datos/farmacias.datos.js';
import { FarmaciasServicio } from './logica-de-negocio/farmacias.servicio.js';

const farmaciaServicio = new FarmaciasServicio();
farmaciaServicio.setFarmacias(farmacias);

console.log('\n==========1. Obtener la cantidad de farmacias de la localidad Córdoba.=============');
const cantidadFarmaciasEnCba = farmaciaServicio.getTotalFarmacias('Cordoba');
console.log(`En Córdoba hay ${cantidadFarmaciasEnCba} farmacias`);

console.log('\n==========2. Obtener la farmacia cuyo nombre coincida con un string.=============');
const farmaciaXNombre = farmaciaServicio.getFarmacia('SAN MARTIN');
console.table(farmaciaXNombre);


console.log('\n==========3. Listar todas las descripciones de tipologías que existen.=============');
const tipologias = farmaciaServicio.getTipologias();
console.log(`Tipologías`, tipologias);

console.log('\n==========4. ¿Cual es la provincia con más farmacias?======================');
const provinciaConMasFarmacias = farmaciaServicio.getProvinciaConMasFarmacias();
console.log(`La provincia con más farmacias es`, provinciaConMasFarmacias);

