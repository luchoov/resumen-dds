// app.js
import sequelize from './db.js';
import Usuario from './modelos/usuario.js';

(async function main() {
  try {
    await sequelize.authenticate();
    console.log('✔ Conexión establecida con la base de datos');
    //await Usuario.sync(); // crea la tabla si no existe
    const nuevo = await Usuario.create({ nombre: 'Ana', apellido: 'García', usuario: 'ana2025' });
    console.log('Nuevo usuario:', nuevo);
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
})();
