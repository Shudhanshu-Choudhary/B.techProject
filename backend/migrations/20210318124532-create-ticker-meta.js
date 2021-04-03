'use strict';
const {getColumns} = require('../constants')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TickerMeta', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      lastWeek: {
        allowNull: true,
        type: Sequelize.STRING
      },
      lastMonth: {
        allowNull: true,
        type: Sequelize.STRING
      },
      today: {
        allowNull: true,
        type: Sequelize.STRING
      },
      yesterday: {
        allowNull: true,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('TickerMeta');
  }
};
