'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class affiliate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  affiliate.init({
    product_id: DataTypes.INTEGER,
    affiliate_link: DataTypes.STRING,
    ecommerce_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'affiliate',
  });
  return affiliate;
};