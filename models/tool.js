'use strict';
module.exports = (sequelize, DataTypes) => {
  const tool = sequelize.define('tool', {
    type: DataTypes.STRING
  }, {});
  tool.associate = function(models) {
    // associations can be defined here
    models.tool.belongsToMany(models.hazard, {through: 'hazardsTools'});

  };
  return tool;
};