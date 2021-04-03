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
        // const todaysDate = "2021-04-02";
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
        const yesterdayStock = await Stock.findOne({attributes: ['maxStockDatePairString'], where: {date: pastDate}})
        const todayStock = await Stock.findOne({attributes: ['maxStockDatePairString'], where: {date: todaysDate}})

        const lastMonthStockPair = this.fetchMaxStockFromStocks(lastMonthStocks)
        const lastWeekStockPair = this.fetchMaxStockFromStocks(lastWeekStocks)
        // fetch tickers with proper dates
        const tickerMeta = await TickerMeta.findOne();
        if(tickerMeta) {
            console.log('Updatign meta')
                tickerMeta.date = todaysDate;
                tickerMeta.lastMonth = lastMonthStockPair;
                tickerMeta.lastWeek = lastWeekStockPair;
                tickerMeta.yesterday = yesterdayStock && yesterdayStock.maxStockDatePairString || null;
                tickerMeta.today = todayStock && todayStock.maxStockDatePairString || null;
                await tickerMeta.save();
                return tickerMeta;
        } else {
            console.log('Creating meta')

            const tickerMeta = await TickerMeta.create({
                id: uuidv4(),
                date: todaysDate,
                lastMonth: lastMonthStockPair,
                lastWeek: lastWeekStockPair,
                yesterday: yesterdayStock && yesterdayStock.maxStockDatePairString || null,
                today: todayStock && todayStock.maxStockDatePairString || null
            })
            return tickerMeta;
        }
    }
}

module.exports = TickerMetaService;
