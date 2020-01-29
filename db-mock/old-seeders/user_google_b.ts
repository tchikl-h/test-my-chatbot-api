import {
    QueryInterface,
    SequelizeStatic
  } from 'sequelize';
  import * as bcrypt from "bcrypt";

  export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkInsert('user', [{
        firstName: "Albert",
        lastName: "Tredic",
        userName: "atredic",
        password: bcrypt.hashSync("wawa123", bcrypt.genSaltSync(10)),
        mail: "atredic@gmail.com",
        companyOwner: false,
        chatbotIds: [4, 5],
        companyId: 2,
        created_at: new Date(),
        date_update: new Date(),
        deleted_at: null,
      }], {});
    },
  
    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkDelete('user', null, {});
    }
  };