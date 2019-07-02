'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('tools', [
     {
    type: 'nitrile gloves',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    type: 'work gloves',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    type: 'broom gloves',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    type: 'plastic bag',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    type: 'sharps container',
    createdAt: new Date(),
    updatedAt: new Date()
    }
], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('tools', null, {});
  }
};
