'use strict';
const {getColumns} = require('../constants')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TickerMetas', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      ...getColumns(Sequelize),
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      maxStockDatePairString: {
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
    await queryInterface.dropTable('TickerMetas');
  }
};
