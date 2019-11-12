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
                type: Sequelize.TEXT
            },
            periodic_build: {
                type: Sequelize.INTEGER
            },
            webhook_url: {
                type: Sequelize.TEXT
            },
            companyId: {
                type: Sequelize.INTEGER
            },
            created_at: {
                type: Sequelize.DATE
            },
            date_update: {
                type: Sequelize.DATE
            },
            deleted_at: {
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.dropTable('chatbot');
    }
};
