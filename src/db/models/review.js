'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Review.init({
    user_id: DataTypes.UUID,
    product_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });

  Review.associate = function (models) {
    Review.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product',
    });
  };

  return Review;
};