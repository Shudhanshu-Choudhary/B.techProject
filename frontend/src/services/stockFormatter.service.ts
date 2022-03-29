import {STOCK_NAME_LIST} from "../constant";

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
    allStocks.sort((a: any, b: any) => b.mentions - a.mentions);
    return allStocks.slice(0, n);
  }
}

export default StockFormatterService;
