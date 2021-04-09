import React from "react";
import "../assets/scss/pages/home.scss";
import DbCards from "../components/dashboard/DbCards";
import DbContent from "../components/dashboard/DbContent";
import AdminLayout from "../components/base/AdminLayout";
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
    <AdminLayout header='DashBoard'>
      <div className='home-main-container'>
        <DbCards/>
        <DbContent/>
      </div>
    </AdminLayout>
  );
};
export default withRouter(DashBoard);
