import React from "react";
import { PieChart } from "react-minimal-pie-chart";
interface IPieChartProps {
    data:[]
}

const DataPieChart = (props:IPieChartProps)=>{
  return(
    <PieChart
      radius={PieChart.defaultProps.radius - 5}
      segmentsShift={(index) => (index === 0 ? 5 : 0.5)}
      data={props.data}
      label={({ dataEntry }) => dataEntry.value}
    />
  );
};
export default DataPieChart;
