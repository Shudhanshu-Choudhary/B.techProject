const axios = require('axios');
const { Stock } = require("../models");
const { v4: uuidv4 } = require('uuid');
const {stockToWatchList} = require('../constants')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class RedditService {
    static maxStockCount = -1;
    static maxStockName = null;
    // '2021-03-12'
    static currDate = new Date().toISOString().slice(0,10);

    static async updateDate() {
        this.currDate = '2021-02-22';
        // this.currDate = new Date().toISOString().slice(0,10);
    }
    static async getStock(i) {
        const stock = stockToWatchList[i];
        let start = Math.floor(new Date(`${this.currDate}T00:00:00Z`).getTime()/1000)
        let end = Math.floor(new Date(`${this.currDate}T23:59:59Z`).getTime()/1000)
        console.log(start, end)
        let punshiftApi = `https://api.pushshift.io/reddit/submission/search/?q=\'${stock}\'&subreddit=wallstreetbets,stocks&after=${start}&before=${end}&limit=1000`;
        const res = await axios.get(punshiftApi);
        const stockRow = await Stock.findOne({where: {date: this.currDate}})
        if(stockRow) {
            stockRow[stock] = res.data.data.length
            if(this.maxStockCount < res.data.data.length) {
                this.maxStockCount = res.data.data.length;
                this.maxStockName = stock;
            }
            await stockRow.save();
        } else {
            const stockRow = await Stock.create({
                id: uuidv4(),
                date: this.currDate,
                [stock]: res.data.data.length
            })
            if(this.maxStockCount < res.data.data.length) {
                this.maxStockCount = res.data.data.length;
                this.maxStockName = stock;
            }
            await stockRow.save();
        }
        if(i+1===stockToWatchList.length) {
            return 'Done';
        } else await this.getStock(++i)
    }

    static async populateStocksData() {
        return new Promise((resolve, reject) => {
            this.updateDate();
            this.getStock(0).then(async () => {
                console.log('Done')
                const stockRow = await Stock.findOne({where: {date: this.currDate}})
                if(stockRow) {
                    stockRow.maxStockDatePairString = `${this.maxStockName}-${this.maxStockCount}`
                    console.log(this.maxStockCount, this.maxStockName)
                    await stockRow.save();
                }
                RedditService.maxStockCount = null;
                RedditService.maxStockName = null;
                resolve()
            }).catch((e) => {
                reject(e);
            })
        })
    }

    static async test() {
        const stocks = await Stock.findAll({where: { date: {[Op.between]: ['2021-02-21', '2021-03-14']}}})
        return stocks;
    }
}

module.exports = RedditService;
