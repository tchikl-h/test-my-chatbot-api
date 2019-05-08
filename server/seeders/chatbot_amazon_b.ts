import {
    QueryInterface,
    SequelizeStatic
  } from 'sequelize';
  
  export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkInsert('chatbot', [{
        project_name: "Chatbot Amazon B",
        container_mode: "Dialogflow",
        dialogflow_project_id: 5678987655,
        dialogflow_client_email: "amazon@hotmail.fr",
        dialogflow_private_key: "UY9J8F8EZ7D8D687ZJYEF98Y",
        date_update: new Date(),
      }], {});
    },
  
    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkDelete('chatbot', null, {});
    }
  };