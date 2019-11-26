import {
    QueryInterface,
    SequelizeStatic
} from 'sequelize';


export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.createTable('test', {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
            error: {
                type: Sequelize.BOOLEAN,
            },
            chatbotId: {
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
        return queryInterface.dropTable('test');
    }
};
