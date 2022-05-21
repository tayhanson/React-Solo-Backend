'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Languages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Languages.init({
    languages: DataTypes.STRING,
    tutorial_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Languages',
  });
  return Languages;
};