import {
  QueryInterface,
  SequelizeStatic
} from 'sequelize';

export = {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.bulkInsert('test', [{
      name: "Test 2",
      description: "description",
      chatbotId: 3,
      created_at: new Date(),
      date_update: new Date(),
      deleted_at: null,
    }], {});
  },

  down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.bulkDelete('test', null, {});
  }
};