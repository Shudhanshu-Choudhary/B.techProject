import React, { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { AutoSizer } from "react-virtualized";
import StockFormatterService from "../../services/stockFormatter.service";
import { useSelector } from "react-redux";

const DbLineChart = () => {
  const [stocks, setStocks] = useState(null);
  const stocksArr = useSelector((state: any) => state.dashboard.allStocks);
  useEffect(() => {
    if (stocksArr) {
      const data = StockFormatterService.getTopNStocks(stocksArr,8);
      console.log("line data", data);
      setStocks(data);
    }
  }, [stocksArr]);
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
