import {
    QueryInterface,
    SequelizeStatic
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.createTable('chatbot', {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            project_name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            container_mode: {
                type: Sequelize.STRING
            },
            dialogflow_project_id: {
                type: Sequelize.STRING
            },
            dialogflow_client_email: {
                type: Sequelize.STRING
            },
            dialogflow_private_key: {
                type: Sequelize.STRING
            },
            companyId: {
                type: Sequelize.INTEGER
            },
            date_update: {
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.dropTable('chatbot');
    }
};
