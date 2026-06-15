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
    // Crear un nuevo usuario con datos de prueba
    let usuario = { 
      nombre: 'Cuti', 
      apellido: 'Romero', 
      usuario: 'cuti', 
      email: 'cromero@mail.com', 
      genero: 'M', 
      perfilId: 2 
    };
    console.log(`🟢 Creando un nuevo usuario..., antes de crear \n ${JSON.stringify(usuario, null, 2)}`);
    usuario = await Usuario.create(usuario, {
      include: {
        association: 'perfil' // el alias definido en belongsTo()
      }
    });
    
    console.log(`\n🟢 Creando un nuevo usuario..., después de crear \n ${JSON.stringify(usuario, null, 2)}`);

    usuario = await Usuario.findByPk(11);
    console.log(`\n🟢 Nuevo usuario encontrado..., después de crear \n ${JSON.stringify(usuario, null, 2)}`);
  } 
  catch (error) {
    console.error('❌ Ops, algo salió mal.\n', error);
  }

  try{
    // Crear un nuevo usuario con datos de prueba
    let usuario = { 
      nombre: 'Leonel', 
      apellido: 'Messi', 
      usuario: 'leomessi', 
      email: 'leomessi@mail.com', 
      genero: 'M', 
      perfil: { 
        nombre: 'Coach Ágil', 
        responsabilidades: 'Entrenar al equipo en la implementación de las prácticas y ceremonias de la agilidad.' 
      } 
    };
    console.log(`🟢 Creando un nuevo usuario..., antes de crear \n ${JSON.stringify(usuario, null, 2)}`);
    usuario = await Usuario.create(usuario, {
      include: {
        association: 'perfil' // el alias definido en belongsTo()
      }
    });
    
    console.log(`\n🟢 Creando un nuevo usuario..., después de crear \n ${JSON.stringify(usuario, null, 2)}`);

    usuario = await Usuario.findByPk(11);
    console.log(`\n🟢 Nuevo usuario encontrado..., después de crear \n ${JSON.stringify(usuario, null, 2)}`);
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
