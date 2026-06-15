// app.js
import sequelize from './db.js';
import { Op } from 'sequelize';
import { inicializarUsuarios } from './scripts/usuariosSeeder.js';
import { inicializarPerfiles } from './scripts/perfilesSeeder.js';
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
    await inicializarPerfiles();
    await inicializarUsuarios();
    console.log('🟢 Base de datos inicializada desde script');
  } 
  catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
  }

  try{
    // Buscar un usuario por Clave Primaria (ID) para luego actualizar el apellido
    const idBuscar = 2;
    const usuarioEncontrado = await Usuario.findByPk(idBuscar);
    
    if (usuarioEncontrado) {
      console.log(`🟢 Usuario encontrado..., antes de crear \n ${JSON.stringify(usuarioEncontrado, null, 2)}`);
      usuarioEncontrado.apellido = 'Martínez Crespo';

      await usuarioEncontrado.save(); // Guardar los cambios en la base de datos
      console.log(`\n🟢 Usuario Actualizado...`);

      const usuarioRecuperado = await Usuario.findByPk(2);
      console.log(`\n🟢 Usuario recuperado..., después de actualizar \n ${JSON.stringify(usuarioRecuperado, null, 2)}`);

    }
    else {
      console.error('❌ Ops, algo salió mal.\nNo se encontraró el usuario en la base de datos.');
    } 

  } 
  catch (error) {
    console.error('❌ Ops, algo salió mal.\n', error);
  }

  try{
    // Buscar un usuario por Clave Primaria (ID) para luego actualizar el apellido
    const idBuscar = 2;
    const usuarioEncontrado = await Usuario.findByPk(idBuscar);
    
    if (usuarioEncontrado) {
      // Para validar vamos a contar las filas antes y después de borrar el usuario
      const cantidadAntes = await Usuario.count();
      console.log(`🟢 Filas antes de borrar: ${cantidadAntes}`);

      await usuarioEncontrado.destroy(); // Borrado de los datos de la base de datos

      // Para validar vamos a contar las filas antes y después de borrar el usuario
      const cantidadDespues = await Usuario.count();
      console.log(`🟢 Filas después de borrar: ${cantidadDespues}`);

    }
    else {
      console.error('❌ Ops, algo salió mal.\nNo se encontraró el usuario en la base de datos.');
    } 

  } 
  catch (error) {
    console.error('❌ Ops, algo salió mal.\n', error);
  }

  finally {
    // Cerrar la conexión a la base de datos
    await sequelize.close();
    console.log('🔴 Conexión cerrada con la base de datos');
  }
})();
