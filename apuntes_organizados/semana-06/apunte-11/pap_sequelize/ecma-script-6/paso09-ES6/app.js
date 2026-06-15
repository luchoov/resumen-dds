import sequelize from './db.js';
import { inicializarUsuarios } from './scripts/usuariosSeeder.js';
import { inicializarPerfiles } from './scripts/perfilesSeeder.js';
import repositorioUsuario from './repositorios/repositorioUsuario.js';
import repositorioPerfil from './repositorios/repositorioPerfil.js';

(async function main() {
  try {
    await sequelize.authenticate();
    console.log('✔ Conexión establecida con la base de datos');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
    return;
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

  try {

    console.log('\n🧪 Usuarios - Obtener todos (página 1):');
    const usuarios = await repositorioUsuario.obtenerTodos({ pagina: 1, limite: 5 });
    console.log(`\nTotal de usuarios: ${usuarios.length}`);
    usuarios.forEach(u => console.log(`- ${u.nombre} ${u.apellido}`));

    console.log('\n🔍 Buscar usuario por nombre de usuario:');
    const ana = await repositorioUsuario.obtenerPorUsuario('ana2025');
    console.log();
    console.log(ana ? `Encontrado: ${ana.nombre} ${ana.apellido}` : 'No encontrado');

    console.log('\n📁 Buscar perfil por nombre:');
    const perfil = await repositorioPerfil.obtenerPorNombre('Desarrollador');
    if (perfil) {
      console.log(`Perfil: ${perfil.nombre}`);
    } else {
      console.log('\nPerfil no encontrado');
    }

  } catch (error) {
    console.error('❌ Error durante la ejecución:', error);
  }
})();