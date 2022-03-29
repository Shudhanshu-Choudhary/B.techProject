import { STOCK_NAME_LIST } from "../constant";

class StockFormatterService {
  static stocksMentionCountArray: {name: string, mentions: number}[] = [];
  static topNArray: {[n: number]: any[]} = {};
  static convertStocksToArray(stockData: any) {
    console.log({ stockData });
    
    if(!stockData) return ;
    const arry = [];
    for (let stockName of STOCK_NAME_LIST) {
      if(!stockData[stockName]) continue;
      arry.push({ name: stockName, mentions: stockData[stockName] });
    }
    this.stocksMentionCountArray = arry.slice();
    
    return arry.slice();
  }

  static getStocksCountArray() {
    if(this.stocksMentionCountArray.length)
      return this.stocksMentionCountArray;
  }

  static getTopNStocks(n: number) {
    const arr = this.stocksMentionCountArray.slice();
    if(this.topNArray[n]) {
      return this.topNArray[n];
    }
    arr.sort((a, b) => b.mentions - a.mentions);
    this.topNArray[n] = arr.slice(0, n);
    return this.topNArray[n];
  }
}

export default StockFormatterService;
