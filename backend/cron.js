var cron = require('node-cron');
const RedditService = require("./services/RedditApi");

cron.schedule('0 0 * * *', async () => {
    console.log('running cron')
    await RedditService.populateStocksData();
    console.log('done')
});
