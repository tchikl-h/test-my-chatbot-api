import {
  QueryInterface,
  SequelizeStatic
} from 'sequelize';

export = {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.bulkInsert('test', [{
      name: "Test 1",
      description: "description",
      chatbotId: 7,
      created_at: new Date(),
      date_update: new Date(),
      deleted_at: null,
    }], {});
  },

  down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.bulkDelete('test', null, {});
  }
};