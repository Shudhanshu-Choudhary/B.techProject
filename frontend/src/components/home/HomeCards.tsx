import React from "react";
import DetailsCard from "../base/DetailsCard";

const HomeCards = ()=>{
  return(
    <div className="home-card-container">
      <DetailsCard text={"CCIV"} header={"Most Mentioned Today"} color={"#FFF"}/>
      <DetailsCard text={"CCIV"} header={"Most Mentioned Yesterday"} color={"#FFF"}/>
      <DetailsCard text={"CCIV"} header={"Most Mentioned Week"} color={"#FFF"}/>
      <DetailsCard text={"TSLA"} header={"Most Mentioned All-time"} color={"#FFF"}/>
    </div>
  );
};
export default HomeCards;
