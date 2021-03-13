'use strict';
const {
    Model
} = require('sequelize');
const {getColumns} = require('../constants')
module.exports = (sequelize, DataTypes) => {
    class Stock extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Stock.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        ...getColumns(DataTypes)
    }, {
        sequelize,
        modelName: 'Stock',
    });
    return Stock;
};
