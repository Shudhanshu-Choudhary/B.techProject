const axios = require('axios');
const { Stock, TickerMeta, Post } = require("../models");
const { v4: uuidv4 } = require('uuid');
const {stockToWatchList} = require('../constants')

class DashboardService {
    static async getUserPicksStockData(user) {
        console.log('User is', user)
        const stock = await Stock.findAll({
            attributes: [...user.stockPicks, "date"],
            order: [ [ 'createdAt', 'DESC' ]]
        });
        return stock;
    }
}

module.exports = DashboardService;
