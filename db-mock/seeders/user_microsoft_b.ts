import {
    QueryInterface,
    SequelizeStatic
  } from 'sequelize';
  import * as bcrypt from "bcrypt";

  export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
      return queryInterface.bulkInsert('user', [{
        firstName: "Elizabeth",
        lastName: "Tylor",
        userName: "etylor",
        password: bcrypt.hashSync("lolo123", bcrypt.genSaltSync(10)),
        mail: "etylor@gmail.com",
        companyOwner: false,
        chatbotIds: [7, 8],
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