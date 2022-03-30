import React, { useEffect, useState } from "react";
import "../assets/scss/pages/home.scss";
import DataService from "../services/data.service";
import { withRouter } from "react-router-dom";
import { Card} from "semantic-ui-react";
import defaultThumbnail from "../assets/pMkc6Lo.png";
import PaginationExampleCompact from "../pages/paggination";


interface IStock {
    id: any
    author: string
    link: string
    title: string
    subreddit: string
    thumbnail: string
}
const PostCards = ()=> {
  
  const [posts, setPosts] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState([]);

  useEffect(()=>{
    // API  
    DataService.fetchData().then((response: any) => {
      const data = response.data;
      console.log(data);
      if(data.posts) {
        setPosts(data.posts);
      }
    });
  },[]);
  console.log(postsPerPage);
  
  //
  // if(posts) {
  //   const a = posts.slice(1,11);
  //   setPostsPerPage(a);
  //   const val = ( posts.length / a.length );
  //   setTotalPage(val);
  // }

  const renderStockData = () => {
    return postsPerPage.map((post: IStock) => {
      const thumbnail = (post.thumbnail === "default" || post.thumbnail === "self") ? defaultThumbnail : post.thumbnail;
      return (
        <div className="cards" key={post.id}>
            <Card style={{ margin: "1rem", padding: "0.1rem", width: "22rem"}} >
              <Card.Content >
                <div><span style={{ fontWeight: "bold" }}>{post.title}</span></div>
                <span style={{ color: "#898989" }}>by {post.author}</span>
              </Card.Content>
              <Card.Content extra>
                <img src={thumbnail} style={{ height: "4rem", width: "5rem", borderRadius: "50%" }} alt=""/>
                <div>
                  <span>Subreddit: {post.subreddit}</span>
                </div>
                <a href={post.link} target='_blank' rel='noreferrer'>View more</a>
              </Card.Content>
          </Card>
        </div>
      );
    });
  };

  return(
    <div className="postCard-container">
      <div style={{ display: "flex",justifyContent: "space-between", flexWrap: "wrap", margin: "1rem 2rem" }}>
         {renderStockData()}
      </div>
      <div className="pagination-conatiner">
        <PaginationExampleCompact totalPages={totalPage}/>
      </div>
    </div>
  );
};
export default withRouter(PostCards);
