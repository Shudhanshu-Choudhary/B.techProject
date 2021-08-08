import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import StockFormatterService from "../../services/stockFormatter.service";
import { AutoSizer } from "react-virtualized";
import { useSelector } from "react-redux";
import { RootState } from "../../index";

const DbBarChart = ()=>{
  // const data: any = useContext(StockDataContext);
  const stocks2 = useSelector((state: RootState) => state.dashboard.stockData);
  const [stocks, setStocks] = useState(null);

  useEffect(()=>{
    if(!stocks) {
      const stocksData = StockFormatterService.getStocksCountArray();
      console.log("bar chart data", stocksData);
      setStocks(stocksData);
    }
  },[]);
  // useEffect(() => {
  //   StockFormatterService.convertStocksToArray(stocks2);
  // }, [stocks2]);

  console.log("stocks2");
  console.log(stocks2);
  return(
    <AutoSizer>
      {({ height, width }) => (
        <>
          {stocks ?
            <BarChart width={width} height={height - 50} data={stocks} margin={{ top: 20, right: 30, left: 20, bottom: 5, }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="mentions" stackId="a" fill="#8884d8" />
            </BarChart> : null }
        </>
      )}
    </AutoSizer>
  );
};
export default DbBarChart;
