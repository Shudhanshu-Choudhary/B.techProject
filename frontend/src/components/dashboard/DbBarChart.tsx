import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import StockFormatterService from "../../services/stockFormatter.service";
import { AutoSizer } from "react-virtualized";
import { useSelector } from "react-redux";
import { RootState } from "../../index";

const DbBarChart = ()=> {
  
  const { parsedStock }  = useSelector((state: RootState) => {    
    console.log(state.dashboard.pick.stock);
    const parsedStock = StockFormatterService.convertStocksToArray(state.dashboard.pick.stock);
    console.log(parsedStock);
    
    return {
      parsedStock,
    };
  });

  return(
    <AutoSizer>
      {({ height, width }) => (
        <>
          {parsedStock ?
            <BarChart width={width} height={height - 50} data={parsedStock} margin={{ top: 20, right: 30, left: 20, bottom: 5, }}>
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
