import React from "react";
import Post from "../components/PostCards";
import AdminLayout from "../components/base/AdminLayout";

const Posts = ()=>{
  return(
    <AdminLayout header='Posts' id={3}>
      <div className='home-announcement-main-container'>
        <div className='home-announcement-container'>
          <Post/>
        </div>
      </div>
    </AdminLayout>
  );
};
export default Posts;
