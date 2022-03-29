import React, { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import StockFormatterService from "../../services/stockFormatter.service";
import { AutoSizer } from "react-virtualized";
import { useSelector } from "react-redux";

const DbAreaChart = () => {
  const [stocks, setStocks] = useState(null);
  const { allStocks } = useSelector((state: any) => {
    const allStocks = state.dashboard.stockData.stock;
    return {
      allStocks,
    }
  });

  useEffect(() => {
    if(allStocks) {
      const parsedStockArr = StockFormatterService.convertStocksToArray(allStocks);
      const data = StockFormatterService.getTopNStocks(parsedStockArr, 5);
      setStocks(data);
    }
  }, [allStocks]);

  return(
    <AutoSizer>
      {({ height, width }) => (
        <>
          {stocks ?
            <AreaChart
              width={width}
              height={height - 50}
              data={stocks}
              margin={{
                top: 0,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="mentions" stroke="#8884d8" fill="#8884d8" />
            </AreaChart> : null }
        </>
      )}
    </AutoSizer>
  );
};
export default DbAreaChart;
