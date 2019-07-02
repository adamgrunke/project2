'use strict';
module.exports = (sequelize, DataTypes) => {
  const hazardsTools = sequelize.define('hazardsTools', {
    hazardId: DataTypes.INTEGER,
    toolId: DataTypes.INTEGER
  }, {});
  hazardsTools.associate = function(models) {
    // associations can be defined here
  };
  return hazardsTools;
};