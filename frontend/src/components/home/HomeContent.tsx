import React from "react";
import {Card, Feed, Table} from 'semantic-ui-react';
import "../../assets/scss/components/home/homeContent.scss";
import HomeTweets from "./HomeTweets";
import HomeTable from "./HomeTable";
import HomeBarChart from "./HomeBarChart";
import HomeAreaChart from "./HomeAreaChart";

const HomeContent = ()=>{

    return(
        <div className="hc-main-container">
            <Card className='hc-card'>
                <div className='hc-card-header'>Stock Mentions</div>
                <HomeBarChart/>
            </Card>
            <Card className='hc-card'>
                <div className='hc-card-header'>All Activity</div>
                <HomeAreaChart/>
            </Card>
            <Card className="hc-first-container hc-card">
                <div className='hc-card-header'>Most Mentioned Activity</div>
                <HomeTweets/>
            </Card>
            <Card className="hc-second-container hc-card">
                <div className='hc-card-header'>Latest</div>
                <div className='hc-table-container'>
                    <HomeTable/>
                </div>
            </Card>
        </div>
    )
}
export default HomeContent;
