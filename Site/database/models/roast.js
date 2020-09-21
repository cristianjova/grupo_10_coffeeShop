'use strict';
const {
  Model
} = require('sequelize');
const product = require('./product');
module.exports = (sequelize, DataTypes) => {
  class Roast extends Model {
    static associate(models) {
      this.hasMany(models.product);
    }
  };
  Roast.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'roast',
  });
  return Roast;
};