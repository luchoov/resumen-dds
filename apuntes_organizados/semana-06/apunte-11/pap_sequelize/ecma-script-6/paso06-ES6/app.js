// app.js
import sequelize from './db.js';
import { Op } from 'sequelize';
import { inicializarUsuarios } from './scripts/usuariosSeeder.js';
import { inicializarPerfiles } from './scripts/perfilesSeeder.js';
import Usuario from './modelos/usuario.js';
import Perfil from './modelos/perfil.js';

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
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
  }

  try {
    // Buscar un usuario por ID
    const usuario = await Usuario.findByPk(5,{
      include: [{
        model: Perfil,
        as: 'perfil', // Alias definido en el modelo Usuario
        required: true, // Solo incluir usuarios con perfil asociado
      }]
    }); // Busca el usuario con ID 5
    if (usuario) {
      console.log(`✅ Efectivamente se encontró el usuario \n${JSON.stringify(usuario, null, 2)}`);
    } else {
      console.error('❌ No se encontró el usuario en la base de datos.');
    }

    // Buscar todos los usuarios con apellido que termina en "ez" y no sean los ID 1, 2 o 3
    // Incluyendo el perfil asociado
    const usuarios = await Usuario.findAll({
      where: {
        [Op.and]: [
          { apellido: { [Op.like]: '%ez' } },
          { [Op.not]: { id: [1, 2, 3] } },
        ]
      },
      order: [['apellido', 'ASC']],
      include: [{
        model: Perfil,
        as: 'perfil', // Alias definido en el modelo Usuario
        required: true, // Solo incluir usuarios con perfil asociado
      }]
    });
    if (usuarios.length > 0) {
      console.log(`✅ Resultados:`);
      console.log(JSON.stringify(usuarios, null, 2));
    }
    else {
      console.error('❌ Ops, algo salió mal.\nNo se encontraron usuarios en la base de datos.');
    }

    // Buscar el perfil 'Desarrollador' y los usuarios asociados
    const perfil = await Perfil.findOne({
      where: {
          nombre: { [Op.eq]: 'Desarrollador' }
      },
      include: [{
        model: Usuario,
        as: 'usuarios', // Alias definido en el modelo Perfil
      }]
    });
    if (perfil) {
      console.log(`✅ Resultados:`);
      console.log(JSON.stringify(perfil, null, 2));
    }
    else {
      console.error('❌ Ops, algo salió mal.\nNo se encontraron usuarios en la base de datos.');
    }

  } catch (error) {
    console.error('❌ Ops, algo salió mal.\n', error);
  }
  finally {
    // Cerrar la conexión a la base de datos
    await sequelize.close();
    console.log('🔴 Conexión cerrada con la base de datos');
  }
})();
