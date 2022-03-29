const stockToWatchList = ["AAP", "ALV","AMC","ARMK","BA","BABA","BAC","BB","BBY","BMY","CEA","DAL","DIS","GM","GME","LUV","NIO","PLTR","SAVE","SQ","T","TWTR","AAL","AAPL","APHA","FB","MARA","OPEN","PLUG","RIOT","SNDL","SWIR","TLRY","TSLA","TZOO","UAL","WEN","WING","ZM","ZNGA"]
const getColumns = (Sequelize) => {
    const columns = {};
    stockToWatchList.map((stock) => {
        columns[stock] = {
            type: Sequelize.INTEGER
        };
    });
    return columns;
}

const environment = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${environment}` })
console.log(`./.env.${environment}`)

const APP_URL = process.env.APP_URL;
const SERVER_URL = process.env.SERVER_URL;
const googleRedirectURL = SERVER_URL + '/api/v1/auth/google-cb';
const facebookRedirectURL = SERVER_URL + '/api/v1/auth/facebook-cb';

module.exports = {
    appUrl: APP_URL,
    googleRedirectURL,
    facebookRedirectURL,
    getColumns,
    stockToWatchList
}
