'use strict';
import { config } from 'dotenv';
import hash from '../helpers/hashPass';

config();
const hashedPass = hash(process.env.SEEDER_USER)

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('User', [{
        firstName: 'Imanigirimpuhwe',
        lastName: 'Simon',
        email: 'simon@gmail.com',
        password: hashedPass,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('User', null, {});
  }
};
