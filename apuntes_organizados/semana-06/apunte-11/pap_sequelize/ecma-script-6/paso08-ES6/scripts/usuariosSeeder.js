import sequelize from '../db.js'; // Importar Sequelize desde el archivo db.js
import { enableDbLog, disableDbLog } from '../db.js'; // Importar la función para habilitar el logging
import Usuario from '../modelos/usuario.js';


export async function inicializarUsuarios() {
  const cantidad = await Usuario.count();
  if (cantidad > 0) {
    console.log('⚠️ Ya existen usuarios, no se inicializa.');
    return;
  }
  disableDbLog(); // Desactivar el logging de Sequelize
  console.log('🟢 Inicializando usuarios... (Log Deshabilitado)');
  await Usuario.bulkCreate([
    { nombre: 'Ana', apellido: 'García', usuario: 'ana2025', email: 'ana@mail.com', genero: 'F', perfilId: 1 },
    { nombre: 'Luis', apellido: 'Martínez', usuario: 'lmartinez', email: 'luis@mail.com', genero: 'M', perfilId: 2 },
    { nombre: 'Sofía', apellido: 'López', usuario: 'sofial', email: 'sofia@mail.com', genero: 'F', perfilId: 5 },
    { nombre: 'Julián', apellido: 'Ruiz', usuario: 'jruiz', email: 'julian@mail.com', genero: 'M', perfilId: 2 },
    { nombre: 'Marta', apellido: 'Fernández', usuario: 'mfer', email: 'marta@mail.com', genero: 'F', perfilId: 3 },
    { nombre: 'Carlos', apellido: 'Domínguez', usuario: 'cdom', email: 'carlos@mail.com', genero: 'M', perfilId: 4 },
    { nombre: 'Lucía', apellido: 'Silva', usuario: 'lucias', email: 'lucia@mail.com', genero: 'F', perfilId: 5 },
    { nombre: 'Pedro', apellido: 'Sosa', usuario: 'psosa', email: 'pedro@mail.com', genero: 'M', perfilId: 2 },
    { nombre: 'Valentina', apellido: 'Paz', usuario: 'vpaz', email: 'valentina@mail.com', genero: 'F', perfilId: 1 },
    { nombre: 'Andrés', apellido: 'Cruz', usuario: 'acruz', email: 'andres@mail.com', genero: 'M', perfilId: 6 }
  
  ]);
  enableDbLog(); // Reactivar el logging de Sequelize

  console.log('✅ Usuarios inicializados');
}
