'use strict';
const {
    Model
} = require('sequelize');
const {getColumns} = require('../constants')
module.exports = (sequelize, DataTypes) => {
    class TickerMeta extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    TickerMeta.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        date: {
            type: DataTypes.STRING
        },
        lastWeek: {
            type: DataTypes.STRING
        },
        lastMonth: {
            type: DataTypes.STRING
        },
        today: {
            type: DataTypes.STRING,
        },
        yesterday: {
            type:DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'TickerMeta',
    });
    return TickerMeta;
};
