const bcrypt = require('bcrypt');

('use strict');
const tableName = 'users';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      tableName,
      [
        {
          email: 'test@test.com',
          password: bcrypt.hashSync('11111111', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {});
  },
};
