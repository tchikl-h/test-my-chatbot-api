import {
    QueryInterface,
    SequelizeStatic
  } from 'sequelize';
  
  export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkInsert('assertion', [{
        order: 1,
        userInput: "How are you ?",
        chatbotResponse: "I'm fine, thank you :)",
        intent: "Mood",
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