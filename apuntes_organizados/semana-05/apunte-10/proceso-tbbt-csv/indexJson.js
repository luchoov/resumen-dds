"use strict";

import { readFile } from 'fs/promises';

// Función para leer archivo con el vector de objetos JSON y 
//  devolver una promesa con el resultado
function readJSON(file) {
    return readFile(file, 'utf8')
        .then(data => JSON.parse(data));
}

(function main() {
    readJSON('./data/tbbt.json')
        .then(data => {
            // console.log("Temporada 1");
            // data
            //     .filter(element => element.season === '1')
            //     .forEach(element => {
            //         console.log(element.title, " => ", element.imdb_rating);
            //     });

            // console.log("Episodio 22 de la temporada 3", 
            //     data.find(element => element.season === '3' && element.episode_num === '22').title
            // );

            // const season3 = data.filter(element => element.season === '3');
            // const ratingAvg = season3.reduce((suma, element) => 
            //     suma += parseFloat(element.imdb_rating), 0) / season3.length;
            // console.log("Rating IMDB promedio de la temporada 3: ", ratingAvg);

            // // En esta primera alternativa vamos a utilizar como clave del map una cadena compuesta por
            // //  la cadena de la temporada concatenada con la cadena del número de episodio
            // const mapTbbt = new Map(data.map( element => 
            //     [element.season + element.episode_num, element]
            // ));

            // // Vemos un gran beneficio a la hora de acceder al episodio 22 de la temporada 3
            // //  es un acceso directo
            // console.log("Episodio 22 de la temporada 3");
            // // console.log(mapTbbt.has('322'));
            // console.log(mapTbbt.get('322'));

            // // Quizás no vemos tanto beneficio al acceder para buscar toda la temporada 1
            // //  y algo parecido va a pasar para calcular el rating promedio de la temporada 3
            // console.log("Temporada 1");
            // Array.from(mapTbbt.values())
            //     .filter(element => element.season === '1')
            //     .forEach(element => console.log(element.title, " => ", element.imdb_rating));

            

            // Ahora construyamos un mapa de mapas, nos va a costar un poco más construirlo pero veremos los beneficios
            //  este bloque ya lo analizamos cuando vimos alternativas de construcción de mapas
            // Esencialmente lo que hace es para cada elemento, 
            //   si la temporada ya existe en el mapa de temporadas agrega el episodio al mapa asociado a la temporada
            //   si la temporada no existe agrega una nueva entrada al mapa de temporadas con un mapa nuevo como valor conteniendo 
            //     este único episodio
            const mapTbbt = new Map()
            data.forEach(element => {
                mapTbbt.has(element.season) ?
                    mapTbbt.get(element.season).set(element.episode_num, element)
                    : mapTbbt.set(element.season, new Map([[element.episode_num, element]]));
            });

            // Vemos un gran beneficio a la hora de acceder al episodio 22 de la temporada 3
            //  es un acceso directo
            console.log("Episodio 22 de la temporada 3");
            // El primer get obtiene el mapa de la temporada 3 y a ese nuevo mapa le pido el episodio 22
            console.log(mapTbbt.get('3').get('22'));

            // Pero ahora sí mostrar la temporada 1 se vuelve simple
            console.log("Temporada 1");
            // Al mapa de temporadas le pido la 1 y sobre esa temporada muestro todos los episodios
            Array.from(mapTbbt.get('1').values())
                .forEach(element => console.log(element.title, " => ", element.imdb_rating));            

            // E incluso en el caso del rating promedio de la temporada 3 seguimos muy simple 
            //  puesto que vuelvo a trabajar siempre sobre una sola temporada
            console.log("Rating promedio de la temporada 3")
            const ratingAvg = Array.from(mapTbbt.get('3').values())
                                .reduce((suma, element) => suma += parseFloat(element.imdb_rating), 0) / mapTbbt.get('3').size;
            console.log("Rating IMDB promedio de la temporada 3: ", ratingAvg);

        })
        .catch(error => console.error('Error al consumir el archivo JSON:', error));
})();

