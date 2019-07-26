import {
    QueryInterface,
    SequelizeStatic
  } from 'sequelize';
  import * as bcrypt from "bcrypt";

  export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkInsert('user', [{
        firstName: "Thomas",
        lastName: "Johnson",
        userName: "tjohnson",
        password: bcrypt.hashSync("lala123", bcrypt.genSaltSync(10)),
        mail: "tjohnson@gmail.com",
        companyOwner: false,
        chatbotIds: [2, 3],
        companyId: 1,
        created_at: new Date(),
        date_update: new Date(),
        deleted_at: null,
      }], {});
    },
  
    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkDelete('user', null, {});
    }
  };