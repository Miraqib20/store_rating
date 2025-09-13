const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

// Models
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
   password: { type: DataTypes.STRING(255), allowNull: false },
  address: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'normal_user' }
}, { underscored: true });

const Store = sequelize.define('Store', {
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING }
}, { underscored: true });

const Rating = sequelize.define('Rating', {
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  store_id: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  comment: { type: DataTypes.TEXT }
}, { underscored: true });

// Relationships
User.hasMany(Rating, { foreignKey: 'user_id' });
Store.hasMany(Rating, { foreignKey: 'store_id' });
Rating.belongsTo(User, { foreignKey: 'user_id' });
Rating.belongsTo(Store, { foreignKey: 'store_id' });

module.exports = { sequelize, Sequelize, Op: Sequelize.Op, User, Store, Rating };
