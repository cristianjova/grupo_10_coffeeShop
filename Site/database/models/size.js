'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    static associate(models) {
      this.hasMany(models.product);
    }
  };
  Size.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'size',
  });
  return Size;
};