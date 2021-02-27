'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      googleId: {
        type: Sequelize.STRING
      },
      googleEmail: {
        type: Sequelize.STRING
      },
      googleName: {
        type: Sequelize.STRING
      },
      googlePicture: {
        type: Sequelize.TEXT
      },
      facebookId: {
        type: Sequelize.STRING
      },
      facebookName: {
        type: Sequelize.STRING
      },
      facebookEmail: {
        type: Sequelize.STRING
      },
      facebookPicture: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
