import sequelize from '../db.js'; // Importar Sequelize desde el archivo db.js
import { enableDbLog, disableDbLog } from '../db.js'; // Importar la función para habilitar el logging
import Perfil from '../modelos/perfil.js';


export async function inicializarPerfiles() {
    const cantidad = await Perfil.count();
    if (cantidad > 0) {
      console.log('⚠️ Ya existen perfiles, no se inicializa.');
      return;
    }
  disableDbLog(); // Desactivar el logging de Sequelize
  console.log('🟢 Inicializando perfiles... (Log Deshabilitado)');
  await Perfil.bulkCreate([
    { nombre: 'Analista Funcional', responsabilidades: 'Relevar requisitos, documentar funcionalidades, interactuar con el cliente.' },
    { nombre: 'Desarrollador', responsabilidades: 'Implementar funcionalidades, corregir errores, participar en revisiones de código.' },
    { nombre: 'Scrum Master', responsabilidades: 'Facilitar el proceso ágil, remover impedimentos, liderar las ceremonias Scrum.' },
    { nombre: 'Product Owner', responsabilidades: 'Definir backlog del producto, priorizar funcionalidades, representar al cliente.' },
    { nombre: 'Tester', responsabilidades: 'Diseñar casos de prueba, ejecutar pruebas manuales y automáticas, reportar bugs.' },
    { nombre: 'Stakeholder', responsabilidades: 'Interesado en el producto o proyecto, puede aportar requisitos o feedback.' }
  ]);
  enableDbLog(); // Reactivar el logging de Sequelize

  console.log('✅ Perfiles inicializados');
}
