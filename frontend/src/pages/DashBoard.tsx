import React, { useEffect, useState } from "react";
import "../assets/scss/pages/home.scss";
import DbCards from "../components/dashboard/DbCards";
import DbContent from "../components/dashboard/DbContent";
import AdminLayout from "../components/base/AdminLayout";
import { withRouter } from "react-router-dom";
import StorageService from "../services/storageService";
import DataService from "../services/data.service";
import AuthBackendApiService from "../services/authBackendApi.service";
import DbHeader from "../components/dashboard/DbHeader";
import { setStockData } from "../state/reducers/dashboardReducer";
import { useDispatch } from "react-redux";

const DashBoard = (props: any) => {
  const query = new URLSearchParams(props.location.search);
  const token = query.get("token") || StorageService.getValueFromKey("token");

  const [stock] = useState(null);
  const dispatch = useDispatch();

  useEffect(()=>{
    // API
    DataService.fetchData().then((response: any) => {
      const data = response.data;
      
      if(data.stock) {
        dispatch(setStockData(data));
      }
    });
  },[]);

  const getUser = async () => {
    const user = await AuthBackendApiService.getUserFromToken(token);
    const userData = JSON.stringify(user.data);
    StorageService.setKey("userData", userData);
  };

  console.log(stock);
  
  useEffect(() => {
    if (token) {
      StorageService.setKey("token", token);
      getUser();
    }
  }, []);

  return(
    <AdminLayout header='DashBoard' id={1}>
      <div className='home-main-container' style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {stock ? <>
          <DbHeader/>
          <DbCards/>
          <DbContent/>
        </> : null }
      </div>
    </AdminLayout>
  );
};
export default withRouter(DashBoard);
