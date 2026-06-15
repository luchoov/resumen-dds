// app.js
import sequelize from './db.js';
import Usuario from './modelos/usuario.js';

(async function main() {
  try {
    await sequelize.authenticate();
    console.log('✔ Conexión establecida con la base de datos');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
  await Usuario.sync(); // crea la tabla si no existe
  
  // Crear un usuario válido (solo si no existe ya)
  try {
    console.log("Primer intento de crear el usuario 'ana2025'");
    const nuevo = await Usuario.create({
      nombre: 'Ana', 
      apellido: 'García', 
      usuario: 'ana2025', 
      email: 'ana@mail.com', 
      genero: 'F'
    });
    console.log('✔ Usuario creado:', nuevo.usuario);
  } catch (error) {
    console.error('❌ Error al crear usuario inicial:', error.errors?.[0]?.message || error.message);
  }
  // Intento de crear un usuario que ya existe
  try {
    console.log("Segundo intento de crear el mismo usuario 'ana2025'");
    const nuevo = await Usuario.create({
      nombre: 'Ana', 
      apellido: 'García', 
      usuario: 'ana2025', 
      email: 'ana@mail.com', 
      genero: 'F'
    });
    console.log('✔ Usuario creado:', nuevo.usuario);
  } catch (error) {
    console.error('❌ Error al crear usuario inicial:', error.errors?.[0]?.message || error.message);
  }
  console.log("\nIntento de crear un usuario inválido");
  // Intento fallido por validación (usuario con caracteres inválidos)
  try {
    await Usuario.create({ nombre: 'Pepe', apellido: 'López', usuario: 'pe!lusa', email: 'pepe@mail.com', genero: 'M' });
  } catch (error) {
    console.error('🛑 Validación fallida:', error.errors?.[0]?.message);
  }
  console.log("\nIntento de crear un usuario inválido");
  // Intento fallido por restricción (usuario ya existente)
  try {
    await Usuario.create({ nombre: 'Ana', apellido: 'García', usuario: 'ana2025', email: 'otraana@mail.com', genero: 'Femenino' });
  } catch (error) {
    console.error('🚫 Restricción violada:', error.errors?.[0]?.message || error.message);
  }
})();
