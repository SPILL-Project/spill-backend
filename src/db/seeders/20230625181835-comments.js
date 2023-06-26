'use strict';

const { User } = require('../models');
const { Sequelize } = require('sequelize');

async function getRandomUserId() {
  const users = await User.findAll({
    attributes: ['id'],
    order: Sequelize.literal('RAND()'),
    limit: 1,
  });

  return users[0].id;
}

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const comments = [];

    // for (let i = 1; i <= 100; i++) {
    //   const comment = {
    //     userId: await getRandomUserId(),
    //     userId: await getRandomUserId(),
    //     username: `User ${i}`,
    //     body: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    //     parentId: i + 1,
    //     createdAt: getRandomDate(new Date(2023, 1, 1), new Date()),
    //     updatedAt: new Date(),
    //   };
    //   comments.push(comment);
    // }
    await queryInterface.bulkInsert(
      'People',
      [
        {
          userId: 1,
          username: 'Spill user',
          body: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          parentId: null,
          createdAt: getRandomDate(new Date(2023, 1, 1), new Date()),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    // return queryInterface.bulkInsert('Comments', comments);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Comments', null, {});
  },
};
