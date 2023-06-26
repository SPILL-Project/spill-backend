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

module.exports = {
  async up(queryInterface, Sequelize) {
    const reviews = [];

    for (let i = 1; i <= 100; i++) {
      const review = {
        user_id: await getRandomUserId(),
        product_id: Math.floor(Math.random() * 9) + 1,
        title: `Product ${i}`,
        image: `image_${i}.jpg`,
        rating: Math.floor(Math.random() * 5) + 1,
        description: `Description for product ${i}`,
        like: Math.floor(Math.random() * 100),
        createdAt: getRandomDate(new Date(2023, 1, 1), new Date()),
        updatedAt: new Date(),
      };

      reviews.push(review);
    }

    return queryInterface.bulkInsert('Reviews', reviews);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  },
};
