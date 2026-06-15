import fs from 'fs/promises';
import csv from 'csv-parser';

// Función para leer archivo CSV y devolver una promesa con el resultado
async function readCSV(file) {
    try {
        const results = [];
        const stream = fs.createReadStream(file)
            .pipe(csv());

        for await (const data of stream) {
            results.push(data);
        }

        return results;
    } catch (error) {
        throw error;
    }
}

export { readCSV };