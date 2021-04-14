import React from "react";
import { Card } from "semantic-ui-react";
import "../../assets/scss/components/home/homeContent.scss";
import DbTweets from "./DbTweets";
import DbBarChart from "./DbBarChart";
import DbAreaChart from "./DbAreaChart";
import DbLineChart from "./DbLineChart";
import DbPieChart from "./DbPieChart";
import DbTable from "./DbTable";

const DbContent = ()=>{
  return(
    <div className="hc-main-container">
      <Card className='hc-card hc-card-barchart' style={{ width: "100%", height: "520px" }}>
        <div className='hc-card-header'>Stock Mentions</div>
        <DbBarChart/>
      </Card>

      <div style={{ width: "100%", height: "520px", display: "flex" }}>
        <Card className="hc-card" style={{ width: "50%" }}>
          <div className='hc-card-header'>Most Mentioned Activity</div>
          <DbPieChart/>
        </Card>
        <Card className="hc-second-container hc-card"  style={{ width: "50%" }}>
          <div className='hc-card-header'>Latest</div>
          <div className='hc-table-container'>
            <DbTable/>
          </div>
        </Card>
      </div>
      <Card className="hc-card" style={{ width: "100%", height: "520px" }}>
        <div className='hc-card-header'>Top 20 tickers comparison</div>
        <DbAreaChart/>
      </Card>
      <div style={{ width: "100%", height: "520px", display: "flex" }}>
        <Card className="hc-first-container hc-card">
          <div className='hc-card-header'>Recent posts</div>
          <DbTweets/>
        </Card>
        <Card className="hc-card" style={{ width: "100%", height: "520px" }}>
          <div className='hc-card-header'>Top 10 tickers comparison</div>
          <DbLineChart/>
        </Card>
      </div>
    </div>
  );
};
export default DbContent;
