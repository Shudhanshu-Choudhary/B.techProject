import React, { useEffect, useState } from "react";
import "../assets/scss/pages/home.scss";
import { withRouter } from "react-router-dom";
import { Card } from "semantic-ui-react";
import defaultThumbnail from "../assets/pMkc6Lo.png";

interface IStock {
    author: string
    link: string
    title: string
    subreddit: string
    thumbnail: string
}
const PostCards = ()=>{
  const [stocks, setStocks] = useState(null);
  const data: any = [];

  useEffect(() => {
    if(stocks) { // TODO it was !stocks
      console.log("posts data", data[0].posts);
      setStocks(data[0].posts);
    }
  }, []);

  const renderStockData = () => {
    const stockCards: Array<JSX.Element> = [];
    if(!stocks) {
      return [];
    }
    stocks.forEach((stock: IStock) => {
      const thumbnail = (stock.thumbnail === "default" || stock.thumbnail === "self") ? defaultThumbnail : stock.thumbnail;
      stockCards.push(
        <Card style={{ margin: "1rem", padding: "0.1rem", width: "22rem" }}>
          <Card.Content>
            <div><span style={{ fontWeight: "bold" }}>{stock.title}</span></div>
            <span style={{ color: "#898989" }}>by {stock.author}</span>
          </Card.Content>
          <Card.Content extra>
            <img src={thumbnail} style={{ height: "4rem", width: "5rem", borderRadius: "50%" }} alt=""/>
            <div>
              <span>Subreddit: {stock.subreddit}</span>
            </div>
            <a href={stock.link} target='_blank' rel='noreferrer'>View more</a>
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
