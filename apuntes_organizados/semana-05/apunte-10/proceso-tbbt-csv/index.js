"use strict";

import { createReadStream } from 'fs';
import csv from 'csv-parser';

// Función para leer archivo CSV y devolver una promesa con el resultado
function readCSV(file) {
    return new Promise((resolve, reject) => {
        const results = [];
        createReadStream(file)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

(function main() {
    readCSV('./data/tbbt.csv')
        .then(data => {
            console.log("Temporada 1");
            data
                .filter(element => element.season === '1')
                .forEach(element => {
                    console.log(element.title, " => ", element.imdb_rating);
                });

            console.log("Episodio 22 de la temporada 3", 
                data.find(element => element.season === '3' && element.episode_num === '22').title
            );

            const season3 = data.filter(element => element.season === '3');
            const ratingAvg = season3.reduce((suma, element) => suma += parseFloat(element.imdb_rating), 0) / season3.length;
            console.log("Rating IMDB promedio de la temporada 3: ", ratingAvg);

            const mapTbbt = new Map(data.map( element => 
                [element.season + element.episode_num, element]
            ));
            console.log(mapTbbt.has('322'));
            console.log(mapTbbt.get('322'));


            for (const value of mapTbbt.values()) {
                console.log(value);
            }

        })
        .catch(error => console.error('Error al leer archivo CSV:', error));
})();
