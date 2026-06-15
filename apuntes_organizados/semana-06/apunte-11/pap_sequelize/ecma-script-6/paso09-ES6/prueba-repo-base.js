// Importa el repositorio
import sequelize from './db.js'; // Importa la conexión a la base de datos
import { disableDbLog } from './db.js';
import { inicializarUsuarios } from './scripts/usuariosSeeder.js'; // Importa la función para inicializar los datos
import { inicializarPerfiles } from './scripts/perfilesSeeder.js'; // Importa la función para inicializar los datos
import RepositorioBase from './repositorios/repositorioBase.js';
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

    // Por ser el repositorio base debería instanciarlo para con un Modelo específico
    // Después veremos que esto no es necesario cuando usemos repositorios concretos
    const repoBaseUsuarios = new RepositorioBase(Usuario);

    // Usar el repositorio sin tener que preocuparme por detalles de sequelize
    // Esta versión trae la primera página de 10 filas por los valores por defecto
    const usuarios = await repoBaseUsuarios.obtenerTodos();

    // pero tambíen podría utilizar
    // const usuarios = await repositorioUsuario.obtenerTodos({ pagina: 2, limite: 5 });
    // para obtener la segúnda página de 5 filas

    // Luego usar la lista de usuarios como sirva
    usuarios.forEach(u => console.log(`- ${u.nombre} ${u.apellido}`));

    // Obtener el usuario con la clave `id` = 1
    const usuario1 = await repoBaseUsuarios.obtenerPorId(1);
    console.log(`\nUsuario 1: ${usuario1.nombre} ${usuario1.apellido}`);

    // Modificar el nombre del usuario 1 por "Felipe"
    const updatedUsr = await repoBaseUsuarios.actualizar(1, { nombre: "Felipe" });
    console.log(`\nUsuario 1 actualizado: ${updatedUsr.nombre} ${updatedUsr.apellido}`);

    // Contar las filas de la tabla usuarios
    let cantidad = await repoBaseUsuarios.contarFilas();
    console.log(`\nCantidad de usuarios antes de crear: ${cantidad}`);

    // Crear un usuario
    let usuario = { 
        nombre: 'Cuti', 
        apellido: 'Romero', 
        usuario: 'cuti', 
        email: 'cromero@mail.com', 
        genero: 'M', 
        perfilId: 2 
    };
    const newUsr = await repoBaseUsuarios.crear(usuario);
    console.log(`\nUsuario creado: (${newUsr.id}) ${newUsr.nombre} ${newUsr.apellido}`);

    cantidad = await repoBaseUsuarios.contarFilas();
    console.log(`\nCantidad de usuarios después de crear: ${cantidad}`);

    // Borrar el usuario creado
    const deletedUsr = await repoBaseUsuarios.eliminar(newUsr.id);

    cantidad = await repoBaseUsuarios.contarFilas();
    console.log(`\nCantidad de usuarios después de borrar: ${cantidad}`);

})();