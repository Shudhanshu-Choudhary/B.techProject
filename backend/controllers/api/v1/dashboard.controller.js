const express = require('express');
const constants = require('../../../constants')
const DashboardService = require("../../../services/DashboardService");
const dashboardRouter = express.Router();

dashboardRouter.get('/', async (req, res) => {
   console.log("---------------------------------------------------");
    const user = await DashboardService.getUserPicksStockData(req.user);
    console.log(user);
    res.send(user);
});

module.exports = {dashboardRouter};
