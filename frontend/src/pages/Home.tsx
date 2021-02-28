import React from "react";
import "../assets/scss/pages/home.scss";
import HomeAnnouncements from "../components/home/HomeAnnouncements";
import HomeCards from "../components/home/HomeCards";
import HomeContent from "../components/home/HomeContent";
import Layout from "../components/base/Layout";
import { withRouter } from "react-router-dom";
import StorageService from "../services/storageService";
import AuthBackendApiService from "../services/authBackendApi.service";

const Home = (props: any) => {
  const query = new URLSearchParams(props.location.search);
  const token = query.get("token");
  const getUser = async () => {
    const user = await AuthBackendApiService.getUserFromToken(token);
    const userData = JSON.stringify(user.data);
    StorageService.setKey("userData", userData);
  };
  if (token != null) {
    getUser();
    StorageService.setKey("token", token);
  }
    
  return(
    <Layout header='DashBoard'>
      <div className='home-main-container'>
        <HomeCards/>
        <HomeContent/>
        <HomeAnnouncements/>
      </div>
    </Layout>
  );
};
export default withRouter(Home);
