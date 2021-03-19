const axios = require('axios');
const { Stock, TickerMeta } = require("../models");
const { v4: uuidv4 } = require('uuid');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class RedditService {
    static async updateMeta() {
        this.currDate = new Date().toISOString().slice(0,10);
        //Get today's date using the JavaScript Date object.
        const ourDate = new Date();
        //Change it so that it is 7 days in the past.
        const pastDate = ourDate.getDate() - 7;
        ourDate.setDate(pastDate);
        //Log the date to our web console.
        console.log(ourDate.toString());
        // last week date
        console.log(ourDate.toISOString().slice(0,10));
        const pastMonth = ourDate.getDate() - 20;
        ourDate.setDate(pastMonth);
        console.log(ourDate.toISOString().slice(0,10));
        const lastWeekStock = await Stock.findAll({attributes: ['maxStockDatePairString'], where: { date: {[Op.between]: ['2021-02-21', '2021-03-14']}}})
        const lastMonthStock = await Stock.findAll({attributes: ['maxStockDatePairString'], where: { date: {[Op.between]: ['2021-02-21', '2021-03-14']}}})
        const yesteradyStock = await Stock.findAll({where: {date: ''}})
        const todayStock = await Stock.findAll({where: {date: ''}})
    }
}

module.exports = RedditService;
