const express = require('express');
const constants = require('../../../constants')
const DashboardService = require("../../../services/DashboardService");
const dashboardRouter = express.Router();

dashboardRouter.get('/', async (req, res) => {
    const user = await DashboardService.getUserPicksStockData(req.user);
    res.send(user);
});

module.exports = {dashboardRouter};
