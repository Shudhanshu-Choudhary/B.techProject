const axios = require('axios');
const { Stock } = require("../models");
const { v4: uuidv4 } = require('uuid');
const {stockToWatchList} = require('../constants')

class RedditService {
    static async getStock(i) {
        const stock = stockToWatchList[i];
        //currDate format: '2021-03-12';
        const currDate = new Date().toISOString().slice(0,10);
        let start = Math.floor(new Date(`${currDate}T00:00:00Z`).getTime()/1000)
        let end = Math.floor(new Date(`${currDate}T23:59:59Z`).getTime()/1000)
        console.log(start, end)
        let punshiftApi = `https://api.pushshift.io/reddit/submission/search/?q=\'${stock}\'&subreddit=wallstreetbets,stocks&after=${start}&before=${end}&limit=1000`;
        const res = await axios.get(punshiftApi);
        const stockRow = await Stock.findOne({where: {date: currDate}})
        if(stockRow) {
            stockRow[stock] = res.data.data.length
            await stockRow.save();
        } else {
            const stockRow = await Stock.create({
                id: uuidv4(),
                date: currDate,
                [stock]: res.data.data.length
            })
            await stockRow.save();
        }
        if(i+1===stockToWatchList.length) {
            return 'Done';
        } else await this.getStock(++i)
    }

    static async populateStocksData() {
        return new Promise((resolve, reject) => {
            this.getStock(0).then(() => {
                console.log('Done')
                resolve()
            })
        })
    }
}

module.exports = RedditService;
