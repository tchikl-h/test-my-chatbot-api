import {
    QueryInterface,
    SequelizeStatic
  } from 'sequelize';

  export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkInsert('company', [{
        name: "Dunder Mifflin",
        description: "Best place to work",
        token: "Hp4dOar9r6",
        premium: true,
        created_at: new Date(),
        date_update: new Date(),
        deleted_at: null,
      }], {});
    },
  
    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkDelete('company', null, {});
    }
  };