import React, { useContext, useEffect, useState } from "react";
import "../assets/scss/pages/home.scss";
import DbCards from "../components/dashboard/DbCards";
import DbContent from "../components/dashboard/DbContent";
import AdminLayout from "../components/base/AdminLayout";
import { withRouter } from "react-router-dom";
import StorageService from "../services/storageService";
import AuthBackendApiService from "../services/authBackendApi.service";
import { StockDataContext } from "../hooks/DataContext";
import StockFormatterService from "../services/stockFormatter.service";
import DbHeader from "../components/dashboard/DbHeader";

const DashBoard = (props: any) => {
  const query = new URLSearchParams(props.location.search);
  const token = query.get("token") || StorageService.getValueFromKey("token");

  const data: any = useContext(StockDataContext);
  const [stock, setStock] = useState(null);

  useEffect(()=>{
    if(data[0].stock) {
      StockFormatterService.convertStocksToArray(data[0].stock);
      setStock(data[0].stock);
    }
  },[data]);

  const getUser = async () => {
    const user = await AuthBackendApiService.getUserFromToken(token);
    const userData = JSON.stringify(user.data);
    StorageService.setKey("userData", userData);
  };

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
