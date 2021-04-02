import React from "react";
import "../assets/scss/pages/home.scss";
import DbAnnouncements from "../components/dashboard/DbAnnouncements";
import DbCards from "../components/dashboard/DbCards";
import DbContent from "../components/dashboard/DbContent";
import Layout from "../components/base/Layout";
import { withRouter } from "react-router-dom";
import StorageService from "../services/storageService";
import AuthBackendApiService from "../services/authBackendApi.service";

const DashBoard = (props: any) => {
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
        <DbCards/>
        <DbContent/>
        <DbAnnouncements/>
      </div>
    </Layout>
  );
};
export default withRouter(DashBoard);
