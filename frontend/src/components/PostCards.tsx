import React, { useEffect, useState } from "react";
import "../assets/scss/pages/home.scss";
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
const PostCards = ()=>{
  const [stocks, setStocks] = useState([]);

  useEffect( () => {
    const fetchStocks = async () => {
      // const res = await RedditBackendApiService.fetchStocksData();
      const res = require("./temp-json/disData.json");
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
        <Card style={{ margin: "1rem",width: "22rem",height: "12rem" }}>
          {/*<Card.Content header={`${stock.title} `} />*/}
          <Card.Content description={`by ${stock.author}`} />
          <Card.Content extra>
            <img src={thumbnail} style={{ height: "4rem", width: "5rem", borderRadius: "50%" }} alt=""/>
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
    <div style={{ display: "flex",justifyContent: "space-between", flexWrap: "wrap", margin: "1rem 2rem" }}>
      {renderStockData()}
    </div>
  );
};
export default withRouter(PostCards);
