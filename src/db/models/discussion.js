'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discussions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Discussions.init(
    {
      userId: DataTypes.UUID,
      username: DataTypes.STRING,
      productId: DataTypes.INTEGER,
      body: DataTypes.STRING,
      parentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Discussions',
    }
  );
  return Discussions;
};
