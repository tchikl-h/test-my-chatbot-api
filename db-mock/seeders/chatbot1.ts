import {
    QueryInterface,
    SequelizeStatic
  } from 'sequelize';
  
  export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkInsert('chatbot', [{
        project_name: "Lala",
        description: "Awesome description",
        container_mode: "Dialogflow", // TODO: to delete
        dialogflow_project_id: 5678987654, // TODO: to delete
        dialogflow_client_email: "amazon@hotmail.fr", // TODO: to delete
        dialogflow_private_key: "UY9J8F8EZ7D8D687ZJYEF98Y", // TODO: to delete
        periodic_build: 1,
        webhook_url: "https://chatbot.herve-tchikladze.com/talk",
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