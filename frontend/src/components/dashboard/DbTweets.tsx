import React, { useEffect, useState } from "react";
import { Card, Feed } from "semantic-ui-react";

const DbTweets = ()=>{
  const [stocks, setStocks] = useState(null);
  const data: any = [];

  useEffect(() => {
    if(stocks) { // TODO it was !stocks
      console.log("posts data", data[0].posts);
      setStocks(data[0].posts.slice(1, 4));
    }
  }, []);

  return(
    <Card.Content>
      <Feed>
        { stocks && stocks.map((stock: any) => {
          return (
            <Feed.Event key={stock.title}>
              <Feed.Content className='hc-card-content'>
                <Feed.Date content='1 day ago' />
                <Feed.Summary>
                  {stock.title}
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          );
        })}
      </Feed>
    </Card.Content>
  );
};
export default DbTweets;
