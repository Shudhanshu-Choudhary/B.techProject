const axios = require('axios');
const fs = require("fs");

function nextweek(){
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
    return nextweek;
}

function convertToEpoch(dateString) {
    var parts = datestring.match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/);
    return Date.UTC(+parts[3], parts[2]-1, +parts[1], +parts[4], +parts[5]);
}
console.log(nextweek().toString())
console.log(nextweek().getTime())

//last week
//last month
//today
// const stockToWatchList = ["AAP","ALV","AMC","ARMK","BA","BABA","BAC","BB","BBY","BMY","CEA","DAL","DIS","GM","GME","LUV","NIO","PLTR","SAVE","SQ","T","TWTR","AAL","AAPL","APHA","FB","MARA","OPEN","PLUG","RIOT","SNDL","SWIR","TLRY","TSLA","TZOO","UAL","WEN","WING","ZM","ZNGA"]
const stockToWatchList = ["AAP","ALV"]
class RedditService {
    static async fetchStockData() {
        const punshiftApi = 'https://api.pushshift.io/reddit/submission/search/?q=\'DIS\'&subreddit=wallstreetbets,stocks'
        const res = await axios.get(punshiftApi);
        let data = JSON.stringify(res.data);
        console.log('This is the data')
        fs.writeFileSync('disData.json', data);
        return res.data;
    }
    static async populateStocksData() {
        // let punshiftApi = 'https://api.pushshift.io/reddit/submission/search/?q=\'DIS\'&subreddit=wallstreetbets,stocks'
        stockToWatchList.map(async (stock) => {
            let punshiftApi = `https://api.pushshift.io/reddit/submission/search/?q='${stock}'&subreddit=wallstreetbets,stocks`;
            const res = await axios.get(punshiftApi);
            console.log(res.data)
        })
    }
}

module.exports = RedditService;
