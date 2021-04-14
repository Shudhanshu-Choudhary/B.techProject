const axios = require('axios');
const { Stock, TickerMeta, Post } = require("../models");
const { v4: uuidv4 } = require('uuid');
const {stockToWatchList} = require('../constants')

class RedditService {
    static maxStockCount = -1;
    static maxStockName = null;
    // '2021-03-12'
    static currDate = new Date().toISOString().slice(0,10);

    static async updateDate(date) {
        // this.currDate = date
        this.currDate = '2021-03-31';
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
        console.log(res.data.data.length)
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
            const dates = ['2021-03-21', '2021-03-22', '2021-03-23', '2021-03-24','2021-03-25' ,'2021-03-26','2021-03-27','2021-03-28',
                '2021-03-29','2021-03-30','2021-03-31','2021-04-01', '2021-04-02s']
            // dates.forEach((date) => {
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
                console.log('Before resolve')
                resolve()
            }).catch((e) => {
                reject(e);
            })
            })
        // })
    }

    static async test() {
        // const stocks = await Stock.findAll({where: { date: {[Op.between]: ['2021-02-21', '2021-03-14']}}})
        const stocks = await Stock.findAll({order: [['date', 'ASC']]})
        return stocks;
    }

    static async getData() {
        const stock = await Stock.findAll({
            limit: 1,
            order: [ [ 'createdAt', 'DESC' ]]
        });
        const stockMeta = await TickerMeta.findOne();
        const posts = await Post.findAll();
        return {stock: stock[0], stockMeta, posts}
    }

    static async updatePosts() {
        const res = await axios.get("https://api.pushshift.io/reddit/submission/search?subreddit=wallstreetbets,stocks&limit=30");
        const postObjs = []
        res.data.data.forEach((stock) => {
            const {author, thumbnail, title, full_link, subreddit} = stock;
            const postObj = {
                id: uuidv4(),
                author,
                title,
                subreddit,
                thumbnail,
                link: full_link
            }
            console.log(postObj)
            postObjs.push(postObj)
        })
        await Post.destroy({where: {}});
        const posts  =  await Post.bulkCreate(postObjs, {returning: true});
        return posts;
    }

    static async getPosts() {
        return await Post.findAll();
    }
}

module.exports = RedditService;
