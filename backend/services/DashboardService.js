const { Stock, TickerMeta, Post } = require("../models");
const { v4: uuidv4 } = require('uuid');
const {stockToWatchList} = require('../constants')

class DashboardService {
    static async getUserPicksStockData(userObject) {
        const stock = await Stock.findAll({
            attributes: [...userObject.user.stockPicks, "date"],
            order: [ [ 'createdAt', 'DESC' ]]
        });
        return {stock: stock[0]};
    }
}

module.exports = DashboardService;
