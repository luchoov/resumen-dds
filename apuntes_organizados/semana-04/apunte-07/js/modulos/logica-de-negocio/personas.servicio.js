//1- Personas mayores de edad: mayoresDeEdad(personas)
const mayoresDeEdad = (personas) => {
    return personas.filter((persona) => persona.esMayorDeEdad());
};


//2- Persona cuya profesión sea una pasada por argumento, ej: personasXProfesion(personas, 'superheroe')
const personasXProfesion = (personas, profesion) => {
    return personas.filter(p => {
        return p.profesion.toLowerCase() === profesion.toLowerCase();
    });
};

function obtenerPersonaMasGrande(personas) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // const personasOrdByEdadAsc = personas.sort((a, b) => {
    //     // 4 - 5 = -1
    //     return a.edad() - b.edad();
    // });
    const personasOrdByEdadAsc = personas.sort((a, b) => a.edad() - b.edad());
    return personasOrdByEdadAsc[personasOrdByEdadAsc.length - 1];
}

function _obtenerProfesiones(personas) {
    if (!personas) { // true si personas == null o == undefined
        console.warn('No se cargaron personas.')
        return [];
    }
    // console.log(typeof 4324);
    // console.log(typeof 'asdad');
    // console.log('typeof 4324 !== \'string\' ', typeof 4324 !== 'string');
    const profesiones = personas.map((p) => {
        if (typeof p.profesion === 'string')
            return p.profesion;
        console.warn(`La persona ${p.nombre} tiene una profesión no valida: ${p.profesion}`)
        return null;
    });
    // console.log('profesiones', profesiones);
    const profesionesSinDuplicados = [];
    for (const profesion of profesiones) {
        // console.log(profesion, profesionesSinDuplicados.some(p => p.toLowerCase() === profesion.toLowerCase()))
        if (!!profesion && !profesionesSinDuplicados.some(p => p.toLowerCase() === profesion.toLowerCase()))
            profesionesSinDuplicados.push(profesion);
    }
    return profesionesSinDuplicados;
}

const personasServicio = {
    mayoresDeEdad: mayoresDeEdad,
    obtenerPersonaMasGrande: obtenerPersonaMasGrande,
    personasXProfesion: personasXProfesion,
    obtenerProfesiones: _obtenerProfesiones
};

export { personasServicio };