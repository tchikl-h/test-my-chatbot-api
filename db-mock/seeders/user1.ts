import {
    QueryInterface,
    SequelizeStatic
  } from 'sequelize';
  import * as bcrypt from "bcrypt";

  export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkInsert('user', [{
        firstName: "Michael",
        lastName: "Scott",
        userName: "mscott",
        password: bcrypt.hashSync("guest", bcrypt.genSaltSync(10)),
        mail: "mscott@gmail.com",
        companyOwner: true,
        chatbotIds: null,
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