import {
    QueryInterface,
    SequelizeStatic
} from 'sequelize';


export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.createTable('user', {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                type: Sequelize.STRING,
            },
            lastName: {
                type: Sequelize.STRING,
            },
            userName: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            companyOwner: {
                type: Sequelize.BOOLEAN,
            },
            chatbotIds: {
                type: Sequelize.ARRAY(Sequelize.INTEGER),
            },
            companyId: {
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
        return queryInterface.dropTable('user');
    }
};
