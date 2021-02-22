'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Todo', [{
        userId: '1',
        title: 'Seeding todo',
        description: 'Seeding To-Do so we have the initial todo',
        priority: 'LOW',
        createdAt: new Date(),
        updatedAt: new Date()
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Todo', null, {});
  }
};
