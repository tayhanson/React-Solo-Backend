"use strict";

const { faker } = require('@faker-js/faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};


// module.exports = {
//   async up(queryInterface, Sequelize) {
    
//     let users =[];
    
//     for (let i = 0; i < 10; i++) {
//       users.push({
//         firstName: faker.name.firstName(),
//         lastName: faker.name.lastName(),
//         email: faker.internet.email(),
//         password: faker.phone.phoneNumber(),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       })
//     }

//     await queryInterface.bulkDelete("Users", users)
//   },

//   async down(queryInterface, Sequelize) {
   
//   },
// };