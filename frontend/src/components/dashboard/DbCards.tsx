import React, { useContext, useEffect, useState } from "react";
import DetailsCard from "../base/DetailsCard";
import { StockDataContext } from "../../hooks/DataContext";

const DbCards = ()=>{
  const data: any = useContext(StockDataContext);
  const [stockMeta, setStockMeta] = useState(null);

  useEffect(()=>{
    console.log(data);
    if(data[0].stockMeta) {
      console.log("Setting stock meta");
      console.log(stockMeta);
      setStockMeta(data[0].stockMeta);
    }
  },[data]);

  return(
    <div className="home-card-container">
      {stockMeta && stockMeta.lastWeek ? (<>
        <DetailsCard text={stockMeta.today || stockMeta.yesterday} header={"Most Mentioned Today"} color={"#FFF"}/>
        <DetailsCard text={stockMeta.yesterday} header={"Most Mentioned Yesterday"} color={"#FFF"}/>
        <DetailsCard text={stockMeta.lastWeek} header={"Most Mentioned Week"} color={"#FFF"}/>
        <DetailsCard text={stockMeta.lastMonth} header={"Most Mentioned All-time"} color={"#FFF"}/></>) : "Loading"}
    </div>
  );
};

export default DbCards;
