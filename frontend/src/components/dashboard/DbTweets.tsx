import React, { useEffect, useState } from "react";
import { Card, Feed } from "semantic-ui-react";
import {useSelector} from "react-redux";

const DbTweets = ()=>{
  const [topPosts, setTopPosts] = useState(null);
  const { allPosts } = useSelector((state: any) => {
    const allPosts = state.dashboard.stockData.posts;
    return {
      allPosts,
    }
  });
  useEffect(() => {
    if (allPosts) {
      setTopPosts(allPosts.slice(0, 4));
    }
  }, [allPosts]);

  return(
    <Card.Content>
      <Feed>
        { topPosts && topPosts.map((stock: any) => {
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
