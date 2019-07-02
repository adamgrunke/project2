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
    return queryInterface.bulkInsert('items', [
      {
        hazardId: 3,
        location: '47.607255,-122.332473',
        userId: 1,
        cleanerId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        hazardId: 2,
        location: '47.603667,-122.329153',
        userId: 3,
        cleanerId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        hazardId: 1,
        location: '47.620303,-122.349354',
        userId: 1,
        cleanerId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ],{})

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('items',null,{})
  }
};
