import {
    QueryInterface,
    SequelizeStatic
  } from 'sequelize';
  import * as bcrypt from "bcrypt";

  export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkInsert('user', [{
        firstName: "John",
        lastName: "Doe",
        userName: "jdoe",
        password: bcrypt.hashSync("xaxa123", bcrypt.genSaltSync(10)),
        chatbotIds: [8, 9],
        companyId: 3,
        created_at: new Date(),
        date_update: new Date(),
        deleted_at: null,
      }], {});
    },
  
    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkDelete('user', null, {});
    }
  };