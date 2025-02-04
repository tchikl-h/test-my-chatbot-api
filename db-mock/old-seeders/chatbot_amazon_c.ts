import {
    QueryInterface,
    SequelizeStatic
  } from 'sequelize';
  
  export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkInsert('chatbot', [{
        project_name: "Chatbot Amazon C",
        description: "Awesome description",
        dialogflow_project_id: 5678987656,
        dialogflow_client_email: "amazon@hotmail.fr",
        dialogflow_private_key: "UY9J8F8EZ7D8D687ZJYEF98Y",
        companyId: 1,
        created_at: new Date(),
        date_update: new Date(),
        deleted_at: null,
      }], {});
    },
  
    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkDelete('chatbot', null, {});
    }
  };