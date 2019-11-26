import {
    QueryInterface,
    SequelizeStatic
  } from 'sequelize';
  
  export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkInsert('assertion', [{
        order: 2,
        userInput: "blablabla",
        chatbotResponse: "Sorry, I didn't understand :/",
        intent: "Unknown",
        error: null,
        testId: 1,
        created_at: new Date(),
        date_update: new Date(),
        deleted_at: null,
      }], {});
    },
  
    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkDelete('assertion', null, {});
    }
  };