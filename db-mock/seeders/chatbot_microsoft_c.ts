import {
    QueryInterface,
    SequelizeStatic
  } from 'sequelize';
  
  export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkInsert('chatbot', [{
        project_name: "Chatbot Microsoft C",
        description: "Awesome description",
        container_mode: "Dialogflow",
        dialogflow_project_id: 5678987656,
        dialogflow_client_email: "microsoft@hotmail.fr",
        dialogflow_private_key: "UY9J8F8EZ7D8D687ZJYEF98Y",
        companyId: 3,
        created_at: new Date(),
        date_update: new Date(),
        deleted_at: null,
      }], {});
    },
  
    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkDelete('chatbot', null, {});
    }
  };