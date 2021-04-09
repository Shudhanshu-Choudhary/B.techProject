import React, { useEffect, useState } from "react";
import "../assets/scss/pages/home.scss";
import AdminLayout from "../components/base/AdminLayout";
import { withRouter } from "react-router-dom";
import { Card } from "semantic-ui-react";
import defaultThumbnail from "../assets/pMkc6Lo.png";
import Logger from "../lib/logger";

interface IStock {
    author: string
    full_link: string
    title: string
    subreddit: string
    thumbnail: string
}
const Post = ()=>{
  const [stocks, setStocks] = useState([]);

  useEffect( () => {
    const fetchStocks = async () => {
      // const res = await RedditBackendApiService.fetchStocksData();
      const res = require("../components/temp-json/disData.json");
      Logger.log("This is the stocks data for DIS");
      Logger.log(res);
      setStocks(res.data);
    };
    fetchStocks();
  }, []);

  const renderStockData = () => {
    const stockCards: Array<JSX.Element> = [];
    stocks.forEach((stock: IStock) => {
      Logger.log(stock);
      const thumbnail = (stock.thumbnail === "default" || stock.thumbnail === "self") ? defaultThumbnail : stock.thumbnail;
      stockCards.push(
        <Card style={{ margin: "1rem" }}>
          {/*<Card.Content header={`${stock.title} `} />*/}
          <Card.Content description={`by ${stock.author}`} />
          <Card.Content extra>
            <img src={thumbnail} style={{ height: "4rem", width: "4rem", borderRadius: "50%" }} alt=""/>
            <div>
              <span>Subreddit: {stock.subreddit}</span>
            </div>
            <a href={stock.full_link} target='_blank' rel='noreferrer'>View more</a>
          </Card.Content>
        </Card>
      );
    });
    return stockCards;
  };
  return(
    <AdminLayout header='DashBoard'>
      <h3>Hello from post page</h3>
      <div style={{ display: "flex", flexWrap: "wrap", margin: "1rem" }}>
        {renderStockData()}
      </div>
    </AdminLayout>
  );
};
export default withRouter(Post);
