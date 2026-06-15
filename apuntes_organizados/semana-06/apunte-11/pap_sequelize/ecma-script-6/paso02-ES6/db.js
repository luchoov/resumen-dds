// db.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './datos/db.sqlite',
});

export default sequelize;