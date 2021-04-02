const axios = require('axios');
const { Stock, TickerMeta } = require("../models");
const { v4: uuidv4 } = require('uuid');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class TickerMetaService {

    static fetchMaxStockFromStocks(stocks) {
        const maxMonthStock = {}
        stocks.forEach((stock) => {
            console.log('stock is', stock.maxStockDatePairString)
            // AMC-100
            const stockCountPair = stock.maxStockDatePairString.split('-')
            const stockName = stockCountPair[0]
            const stockCount = stockCountPair[1]
            if(stockName in maxMonthStock) {
                maxMonthStock[stockName] += parseInt(stockCount);
            } else {
                maxMonthStock[stockName] = parseInt(stockCount);
            }
        })
        let lastMonthStockCount = -1;
        let lastMonthStockName = null
        Object.keys(maxMonthStock).forEach((stock) => {
            if(lastMonthStockCount < maxMonthStock[stock]) {
                lastMonthStockCount = Math.max(lastMonthStockCount, maxMonthStock[stock]);
                lastMonthStockName = stock;
            }
        })
        const lastMonthStockPair = `${lastMonthStockName}-${lastMonthStockCount}`
        return lastMonthStockPair;
    }
    static async updateMeta() {
        const todaysDate = new Date().toISOString().slice(0,10);
        //Get today's date using the JavaScript Date object.
        let ourDate = new Date();
        //Change it so that it is 7 days in the past.
        const pastWeek = ourDate.getDate() - 7;
        ourDate.setDate(pastWeek);
        //Log the date to our web console.
        const lastWeekDate =  ourDate.toISOString().slice(0, 10);
        console.log(lastWeekDate)
        ourDate = new Date();
        const pastMonth = ourDate.getDate() - 30;
        ourDate.setDate(pastMonth);
        const lastMonthDate = ourDate.toISOString().slice(0, 10)
        console.log(lastMonthDate);
        ourDate = new Date();
        const pastDay = ourDate.getDate() - 1;
        ourDate.setDate(pastDay)
        const pastDate = ourDate.toISOString().slice(0, 10)
        console.log(pastDate);
        const lastMonthStocks = await Stock.findAll({attributes: ['maxStockDatePairString'], where: { date: {[Op.between]: [lastMonthDate, todaysDate]}}})
        const lastWeekStocks = await Stock.findAll({attributes: ['maxStockDatePairString'], where: { date: {[Op.between]: [lastWeekDate, todaysDate]}}})
        const yesterdayStock = await Stock.findAll({attributes: ['maxStockDatePairString'], where: {date: pastDate}})
        const todayStock = await Stock.findAll({attributes: ['maxStockDatePairString'], where: {date: todaysDate}})


        const lastMonthStockPair = this.fetchMaxStockFromStocks(lastMonthStocks)
        const lastWeekStockPair = this.fetchMaxStockFromStocks(lastWeekStocks)
        // fetch tickers with proper dates
        const tickerMeta = await TickerMeta.create({
            date: todaysDate,
            lastMonth: lastMonthStockPair,
            lastWeek: lastWeekStockPair,
            yesterday: yesterdayStock,
            today: todayStock
        })
        console.log('Done', tickerMeta);
    }
}

module.exports = TickerMetaService;
