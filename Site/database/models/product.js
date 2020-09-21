'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.roast);
      this.belongsTo(models.size);
      this.belongsTo(models.toast);
    }
  };
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT(6, 2),
    image: DataTypes.STRING,
    sizeId: DataTypes.INTEGER,
    roastId: DataTypes.INTEGER,
    toastId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return Product;
};