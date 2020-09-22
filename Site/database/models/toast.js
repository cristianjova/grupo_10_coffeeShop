'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Toast extends Model {
    static associate(models) {
      this.hasMany(models.product);
    }
  };
  Toast.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'toast',
  });
  return Toast;
};