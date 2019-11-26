import {
    QueryInterface,
    SequelizeStatic
} from 'sequelize';


export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.createTable('assertion', {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            order: {
                type: Sequelize.INTEGER,
            },
            userInput: {
                type: Sequelize.STRING,
            },
            chatbotResponse: {
                type: Sequelize.STRING,
            },
            intent: {
                type: Sequelize.STRING,
            },
            error: {
                type: Sequelize.STRING,
            },
            testId: {
                type: Sequelize.INTEGER,
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
        return queryInterface.dropTable('assertion');
    }
};
