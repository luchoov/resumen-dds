// db.js
// importamos sequelize desde la librería que instalamos
import { Sequelize } from "sequelize";

// luego creamos la conexión de sequelize con la base de datos
const sequelize = new Sequelize({
  dialect: "sqlite", // informamos el dialecto (base de datos a utilizar)
  storage: "./data/db.sqlite", // y luego informamos el path del archivo de almacenamiento
});

// Notar que también podríamos configurar la base de datos para funcionar en memoria
// Herramienta muy útil para realizar pruebas
// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: ":memory:",
// });

// finalmente exportamos el objeto configurado por defecto del módulo
export default sequelize;
