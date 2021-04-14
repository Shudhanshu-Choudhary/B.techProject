import React, { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart } from "recharts";
import StockFormatterService from "../../services/stockFormatter.service";
import { AutoSizer } from "react-virtualized";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#1aff00", "#FF8042", ];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);
//
//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

const DbPieChart = () => {
  const [stocks, setStocks] = useState(null);
  useEffect(() => {
    if(!stocks) {
      const data = StockFormatterService.getTopNStocks(5);
      console.log("pie data", data);
      setStocks(data);
    }
  }, []);
  return (

    <AutoSizer>
      {({ height, width }) => (
        <>
          {stocks ?
            <PieChart width={width} height={height - 100}>
              <Pie
                data={stocks}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={true}
                outerRadius={100}
                fill="#8884d8"
                dataKey="mentions"
              >
                {stocks.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart> : null }
        </>
      )}
    </AutoSizer>
  );
};

export default DbPieChart;
