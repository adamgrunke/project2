'use strict';
module.exports = (sequelize, DataTypes) => {
  const hazard = sequelize.define('hazard', {
    type: DataTypes.STRING
  }, {});
  hazard.associate = function(models) {
    // associations can be defined here
    models.hazard.hasMany(models.item);
    models.hazard.belongsToMany(models.tool, {through: 'hazardsTools'});

    


  };
  return hazard;
};