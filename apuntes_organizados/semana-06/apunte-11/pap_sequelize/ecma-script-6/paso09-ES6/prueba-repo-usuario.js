// Importa el repositorio
import sequelize from './db.js'; // Importa la conexión a la base de datos
import { disableDbLog } from './db.js';
import { inicializarUsuarios } from './scripts/usuariosSeeder.js'; // Importa la función para inicializar los datos
import { inicializarPerfiles } from './scripts/perfilesSeeder.js'; // Importa la función para inicializar los datos
import repositorioUsuario from './repositorios/repositorioUsuario.js';
import Usuario from './modelos/usuario.js';

(async function main() {
    try {
        await sequelize.authenticate();
        console.log('✔ Conexión establecida con la base de datos');
    } 
    catch (error) {
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

    // Deshabilitar el log de sequelize
    disableDbLog();    

    // Cabe aclarar que no necesitamos crear ninguna instancia de repositorio
    // porque el mismo repositorioUsuario que importamos es una instancia única (singleton)

    // Obtenr la primera página de 10 filas => usando el método del repositorioBase
    const usuarios = await repositorioUsuario.obtenerTodos();
    // Luego usar la lista de usuarios como sirva
    console.log('\n🧪 Usuarios - Obtener todos (página 1 - 10 filas):');
    usuarios.forEach(u => console.log(`- ${u.nombre} ${u.apellido}`));

    // Obtener el usuario con la clave `id` = 1 => usando el método del repositorioBase
    const usuario1 = await repositorioUsuario.obtenerPorId(1);
    console.log(`\nUsuario 1: ${usuario1.nombre} ${usuario1.apellido}`);

    // Modificar el nombre del usuario 1 por "Felipe" => usando el método del repositorioBase
    const updatedUsr = await repositorioUsuario.actualizar(1, { nombre: "Analía" });
    console.log(`\nUsuario 1 actualizado: ${updatedUsr.nombre} ${updatedUsr.apellido}`);

    // Contar las filas de la tabla usuarios => usando el método del repositorioBase
    let cantidad = await repositorioUsuario.contarFilas();
    console.log(`\nCantidad de usuarios antes de crear: ${cantidad}`);

    // Crear un usuario => usando el método del repositorioBase
    let usuario = { 
        nombre: 'Cuti', 
        apellido: 'Romero', 
        usuario: 'cuti', 
        email: 'cromero@mail.com', 
        genero: 'M', 
        perfilId: 2 
    };
    const newUsr = await repositorioUsuario.crear(usuario);
    console.log(`\nUsuario creado: (${newUsr.id}) ${newUsr.nombre} ${newUsr.apellido}`);

    cantidad = await repositorioUsuario.contarFilas();
    console.log(`\nCantidad de usuarios después de crear: ${cantidad}`);

    // Borrar el usuario creado => usando el método del repositorioBase
        const deletedUsr = await repositorioUsuario.eliminar(newUsr.id);

    cantidad = await repositorioUsuario.contarFilas();
    console.log(`\nCantidad de usuarios después de borrar: ${cantidad}`);

    // O también podríamos usar el método del repositorioUsuario
    // Por ejemplo, para obtener un usuario por nobmre de usuario
    const usrAna = await repositorioUsuario.obtenerPorUsuario("ana2025");
    console.log(`\nUsuario 1: ${usrAna.nombre} ${usrAna.apellido}`);

})();