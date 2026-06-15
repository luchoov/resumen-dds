// app.js
import sequelize from './db.js';

(async function main() {
  try {
    await sequelize.authenticate();
    console.log('✔ Conexión establecida con la base de datos');
    // Probemos la conexión con una consulta simple pero que requiera la base de datos
    // aunque sea para procesar la sintaxis de la consulta
    const [resultado] = await sequelize.query("SELECT 1 + 1 AS resultado");
    console.log('Resultado de la consulta:', resultado);
  } 
  catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
  finally {
    await sequelize.close();
    console.log('\n\n✔ Conexión cerrada con la base de datos');
  }
})();
