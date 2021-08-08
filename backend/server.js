const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
var cookieParser = require('cookie-parser');
const RedditService = require("./services/RedditApi");
const TickerMetaService = require("./services/TickerMetaService");
const UserService = require("./services/UserService");
const StripeService = require("./services/StripeService");
const authMiddleware = require("./middleware/auth.middleware");
const {AuthenticationUtil} = require("./services/JWTService");
const JWTService = require("./services/JWTService");
const authRouter = require('./controllers/api/v1/auth.controller').authRouter;
const userRouter = require('./controllers/api/v1/user.controller').userRouter;
const dashboardRouter = require('./controllers/api/v1/dashboard.controller').dashboardRouter;

app.use(cors());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5555;

app.use('/api/v1/auth',authRouter);
app.use(authMiddleware);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/dashboard',dashboardRouter);

app.get('/', (req, res) => {
    res.status(201).send('Server on');
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
app.get('/api/v1/update-meta', async (req, res) => {
    try {
        await TickerMetaService.updateMeta();
        res.status(200).send('Populated')
    } catch (e) {
        const message = e.message || 'Failed while populating data.'
        res.status(400).send({message})
    }
})

app.get('/api/v1/user', async (req,res) => {
    const token = req.query.token;
    const user = await JWTService.getUserFromJWTToken(token)
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
app.get('/api/v1/data', async (req, res) => {
    const stockData = await RedditService.getData();
    res.status(200).send(stockData)
})
app.get('/api/v1/posts', async (req,res) => {
    const posts = await RedditService.getPosts();
    res.status(200).send(posts)
})
app.get('/api/v1/update-posts', async (req, res) => {
    const posts = await RedditService.updatePosts();
    res.status(200).send(posts)
})
app.put('/api/v1/update-picks', async (req, res) => {
    const token = req.headers.token;
    const user = await UserService.updateUserPicks(token ,req.body);
    res.send(user);
})
app.post('/api/v1/create-checkout-session', async (req, res) => {
    await StripeService.payment(res);
})
app.listen(PORT, () => {
    console.log("The server started on port " + PORT);
});
