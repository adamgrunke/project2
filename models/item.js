'use strict';
module.exports = (sequelize, DataTypes) => {
  const item = sequelize.define('item', {
    hazardId: DataTypes.INTEGER,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    cleanerId: DataTypes.INTEGER
  }, {});
  item.associate = function(models) {
    // associations can be defined here
    models.item.belongsTo(models.user);
    models.item.belongsToMany(models.hazard, {through: 'itemsHazards'});
  };
  return item;
};