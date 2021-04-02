const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
var cookieParser = require('cookie-parser');
const RedditService = require("./services/RedditApi");
const TickerMetaService = require("./services/TickerMetaService");
const {AuthenticationUtil} = require("./services/JWTService");
const authRouter = require('./controllers/api/v1/auth.controller').authRouter;

app.use(cors());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 5555;

app.use('/api/v1/auth',authRouter);

app.get('/', (req, res) => {
    res.status(201).send('Server on');
});

app.get('/api/v1/stocks-data', async (req,res) => {
    const stocksData = await RedditService.fetchStockData();
    res.status(200).send(stocksData)
});

app.get('/api/v1/populate-data', async (req, res) => {
    try {
        await RedditService.populateStocksData();
        res.status(200).send('Populated')
    } catch (e) {
        const message = e.message || 'Failed while populating data.'
        res.status(400).send({message})
    }
})

app.get('/api/v1/user', async (req,res) => {
    const token = req.query.token;
    const user = await AuthenticationUtil.getUserFromJWTToken(token)
    console.log(user)
    res.status(200).send(user)
});

app.get('/api/v1/test', async (req, res) => {
    const stocks = await RedditService.test();
    stocks.map((stock) => {
        console.log(stock.dataValues.id)
        console.log(stock.dataValues.date)
    })
    res.status(200).send(stocks);
})
app.get('/api/v1/test-cron', async (req, res) => {
    const stocks = await TickerMetaService.updateMeta();
    res.status(200).send(stocks);
})

app.listen(PORT, () => {
    console.log("The server started on port " + PORT);
});
