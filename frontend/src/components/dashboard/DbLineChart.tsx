import React, { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { AutoSizer } from "react-virtualized";
import StockFormatterService from "../../services/stockFormatter.service";
import { useSelector } from "react-redux";

const DbLineChart = () => {
  const [stocks, setStocks] = useState(null);
  const { allStocks } = useSelector((state: any) => {
    const allStocks = state.dashboard.stockData.stock;
    return {
      allStocks,
    }
  });
  useEffect(() => {
    if (allStocks) {
      const parsedStockArr = StockFormatterService.convertStocksToArray(allStocks);
      const data = StockFormatterService.getTopNStocks(parsedStockArr,8);
      setStocks(data);
    }
  }, [allStocks]);
  return (
    <AutoSizer>
      {({ height, width }) => (
        <>
          {stocks ?
            <LineChart width={width} height={height - 50} data={stocks}>
              <Legend />
              <Line type="monotone" dataKey="mentions" stroke="#8884d8" strokeWidth={2} />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart> : null }
        </>
      )}
    </AutoSizer>
  );
};

export default DbLineChart;
