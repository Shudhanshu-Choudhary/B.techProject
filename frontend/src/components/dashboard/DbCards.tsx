import React, { useContext, useEffect } from "react";
import DetailsCard from "../base/DetailsCard";
import { DataContext } from "../../hooks/DataContext";
import Logger from "../../lib/logger";

const DbCards = ()=>{
  const data:any = useContext(DataContext);
  useEffect(()=>{
    Logger.log(data);
  },[]);

  return(
    <div className="home-card-container">
      <DetailsCard text={"CCIV"} header={"Most Mentioned Today"} color={"#FFF"}/>
      <DetailsCard text={"CCIV"} header={"Most Mentioned Yesterday"} color={"#FFF"}/>
      <DetailsCard text={"CCIV"} header={"Most Mentioned Week"} color={"#FFF"}/>
      <DetailsCard text={"TSLA"} header={"Most Mentioned All-time"} color={"#FFF"}/>
    </div>
  );
};
export default DbCards;
