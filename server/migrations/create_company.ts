import {
    QueryInterface,
    SequelizeStatic
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.createTable('company', {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
            },
            date_update: {
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.dropTable('company');
    }
};
