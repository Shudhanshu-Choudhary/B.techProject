const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
var cookieParser = require('cookie-parser');
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

app.listen(PORT, () => {
    console.log("The server started on port " + PORT);
});
