'use strict';
const bcrypt = require("bcrypt")
const { v4 : uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // {
    //   "username" : "testing",
    //   "fullname" : "testing",
    //   "phone" : "081818261976",
    //   "password" : "aaaaaa"
    // } 

    const users = [];

    for (let i = 0; i < 10; i++) {
      users.push({
        id: uuidv4(),
        username: `user${i}`,
        fullname: `User ${i}`,
        phone: `08123${i}`,
        password: await bcrypt.hash(`password${i}`, await bcrypt.genSalt(10)),
        verified: true,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
