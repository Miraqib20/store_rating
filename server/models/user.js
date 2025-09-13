const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING(60), allowNull: false, validate: { len: [20,60] } },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    address: { type: DataTypes.STRING(400) },
    passwordHash: { type: DataTypes.STRING, allowNull:false },
    role: { type: DataTypes.ENUM('admin','user','owner'), defaultValue: 'user' }
  }, {
    tableName: 'users'
  });

  User.prototype.checkPassword = function(password){
    return bcrypt.compare(password, this.passwordHash);
  };

  return User;
};
