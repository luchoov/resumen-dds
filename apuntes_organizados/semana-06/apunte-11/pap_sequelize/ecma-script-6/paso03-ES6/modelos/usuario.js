// modelos/Usuario.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';

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
    unique: true,
    allowNull: false
  },
  fecha_alta: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuarios',
  timestamps: false
});

export default Usuario;