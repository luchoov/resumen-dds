// app.js
import sequelize from './db.js';
import { inicializarUsuarios } from './scripts/usuariosSeeder.js';
import Usuario from './modelos/usuario.js';

(async function main() {
  try {
    await sequelize.authenticate();
    console.log('✔ Conexión establecida con la base de datos');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }

  try {
    // Crea todas las tablas desde cero y reinicia los autoincrementos
    await sequelize.sync({ force: true });

    // Carga de datos de prueba en tabla usuarios
    await inicializarUsuarios();

    console.log('🟢 Base de datos inicializada desde script');
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
  }

  try {
    // Comprobar la inicialización de los usuarios
    const cantidad = await Usuario.count();
    if (cantidad > 0) {
      console.log(`✅ Efectivamente se crearon ${cantidad} usuarios.`);
    }
    else {
      console.error('❌ No se encontraron usuarios en la base de datos.');
    }
  } catch (error) {
    console.error('❌ Error al contar los usuarios:', error);
  }
})();
