import { STOCK_NAME_LIST } from "../constant";

class StockFormatterService {
  static convertStocksToArray(stockData: any) {
    console.log({ stockData });
    if(!stockData) return ;
    const arry = [];
    for (let stockName of STOCK_NAME_LIST) {
      if(!stockData[stockName]) continue;
      arry.push({ name: stockName, mentions: stockData[stockName] });
    }    
    return arry.slice();
  }

  static getTopNStocks(allStocks: any, n: number): any {
    //allStocks.sort((a, b) => b.mentions - a.mentions);
    console.log(allStocks, n);
    return [];
    // const topNStocks = allStocks.slice(0, n);
    // return topNStocks;
  }
}

export default StockFormatterService;
