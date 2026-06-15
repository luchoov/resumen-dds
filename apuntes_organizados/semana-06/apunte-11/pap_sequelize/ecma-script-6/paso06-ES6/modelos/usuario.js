// modelos/Usuario.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
import Perfil from './perfil.js'; 

class Usuario extends Model {}

Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false, // Restricción a nivel DB
    unique: true,     // Restricción de unicidad
    validate: {
      len: [4, 20],         // Validación: longitud mínima y máxima
      // is permite utilizar expresiones regulares para validar la cadena
      is: /^[a-zA-Z0-9_]+$/ // Validación: solo caracteres alfanuméricos y guiones bajos
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true // Validación de formato de correo electrónico
    }
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [['F', 'M', 'X']],
        msg: 'Debe ser F o M o X'
      }
    }
  }
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuarios',
  timestamps: false
});

// Definición de la relación entre Usuario y Perfil
// Un usuario pertenece a un perfil
Usuario.belongsTo(Perfil, {
  foreignKey: {
    name: 'perfilId',
    field: 'perfil_id'
  },
  as: 'perfil'
});

// Definición de la relación uno a muchos entre Perfil y Usuario
// Un perfil puede tener muchos usuarios
Perfil.hasMany(Usuario, {
  foreignKey: {
    name: 'perfilId',
    field: 'perfil_id'
  },
  as: 'usuarios'
});

export default Usuario;