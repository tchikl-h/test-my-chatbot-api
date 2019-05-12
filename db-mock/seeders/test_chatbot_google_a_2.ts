import {
  QueryInterface,
  SequelizeStatic
} from 'sequelize';

export = {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.bulkInsert('test', [{
      name: "Test 2",
      description: "description",
      chatbotId: 4,
      date_update: new Date(),
    }], {});
  },

  down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.bulkDelete('test', null, {});
  }
};