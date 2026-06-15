// modelos/perfil.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';

class Perfil extends Model {}

Perfil.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  responsabilidades: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  modelName: 'Perfil',
  tableName: 'perfiles',
  timestamps: false
});

export default Perfil;