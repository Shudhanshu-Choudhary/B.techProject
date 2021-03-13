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
module.exports = {
    appUrl: 'http://localhost:3000',
    getColumns,
    stockToWatchList
}
