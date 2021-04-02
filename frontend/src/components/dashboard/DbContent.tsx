import React from "react";
import { Card } from "semantic-ui-react";
import "../../assets/scss/components/home/homeContent.scss";
import DbTweets from "./DbTweets";
import DbTable from "./DbTable";
import DbBarChart from "./DbBarChart";
import DbAreaChart from "./DbAreaChart";

const DbContent = ()=>{

  return(
    <div className="hc-main-container">
      <Card className='hc-card'>
        <div className='hc-card-header'>Stock Mentions</div>
        <DbBarChart/>
      </Card>
      <Card className='hc-card'>
        <div className='hc-card-header'>All Activity</div>
        <DbAreaChart/>
      </Card>
      <Card className="hc-first-container hc-card">
        <div className='hc-card-header'>Most Mentioned Activity</div>
        <DbTweets/>
      </Card>
      <Card className="hc-second-container hc-card">
        <div className='hc-card-header'>Latest</div>
        <div className='hc-table-container'>
          <DbTable/>
        </div>
      </Card>
    </div>
  );
};
export default DbContent;
