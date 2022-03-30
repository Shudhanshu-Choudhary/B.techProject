import React from "react";
import { useSelector } from "react-redux";
import DetailsCard from "../base/DetailsCard";

const DbCards = ()=>{

  const { allMeta } = useSelector((state: any) => {
    const allMeta = state.dashboard.stockData.stockMeta;
    return {
      allMeta,
    }
  });

  return(
    <div className="home-card-container">
      {allMeta && allMeta.lastWeek ? (
        <>
          <DetailsCard text={allMeta.today || allMeta.yesterday} header={"Most Mentioned Today"} color={"#FFF"}/>
          <DetailsCard text={allMeta.yesterday} header={"Most Mentioned Yesterday"} color={"#FFF"}/>
          <DetailsCard text={allMeta.lastWeek} header={"Most Mentioned Week"} color={"#FFF"}/>
          <DetailsCard text={allMeta.lastMonth} header={"Most Mentioned All-time"} color={"#FFF"}/>
        </>
        ) : "Loading"
      }
    </div>
  );
};

export default DbCards;
