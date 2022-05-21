'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.User = User_Language.belongsTo(models.User, {
      //   foreignKey: 'user_id',
      // })
      // this.Languages = User_Language.belongsTo(models.Languages, {
      //   foreignKey: 'languages_id',
      // })
    }
  }
  User_Language.init({
    user_id: DataTypes.INTEGER,
    languages_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_Language',
  });
  return User_Language;
};