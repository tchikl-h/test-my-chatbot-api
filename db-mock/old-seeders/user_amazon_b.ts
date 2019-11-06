import {
    QueryInterface,
    SequelizeStatic
  } from 'sequelize';
  import * as bcrypt from "bcrypt";

  export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkInsert('user', [{
        firstName: "Donald",
        lastName: "Proost",
        userName: "dproost",
        password: bcrypt.hashSync("guest123", bcrypt.genSaltSync(10)),
        mail: "dproost@gmail.com",
        companyOwner: false,
        chatbotIds: [1, 2],
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