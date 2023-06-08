'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    judul: DataTypes.STRING,
    gambar: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    link: DataTypes.STRING,
    terjual: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });

  Product.associate = function (models) {
    Product.hasMany(models.Review, {
      foreignKey: 'product_id',
      as: 'reviews',
    });
  };

  return Product;
};