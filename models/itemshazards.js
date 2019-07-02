'use strict';
module.exports = (sequelize, DataTypes) => {
  const itemsHazards = sequelize.define('itemsHazards', {
    itemId: DataTypes.INTEGER,
    hazardId: DataTypes.INTEGER
  }, {});
  itemsHazards.associate = function(models) {
    // associations can be defined here
  };
  return itemsHazards;
};