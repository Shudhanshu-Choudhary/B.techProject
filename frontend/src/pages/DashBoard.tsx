import React, { useEffect, useState } from "react";
import "../assets/scss/pages/home.scss";
import DbCards from "../components/dashboard/DbCards";
import DbContent from "../components/dashboard/DbContent";
import AdminLayout from "../components/base/AdminLayout";
import { withRouter } from "react-router-dom";
import StorageService from "../services/storageService";
import DataService from "../services/data.service";
import DbHeader from "../components/dashboard/DbHeader";
import { setStockData } from "../state/reducers/dashboardReducer";
import { useDispatch } from "react-redux";

const DashBoard = () => {
  const [isStockAvailable, setIsStocksAvailable] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    // API
    DataService.fetchData().then((response: any) => {
      const data = response.data;
      
      if(data.stock) {      
        setIsStocksAvailable(true);
        dispatch(setStockData(data));
      }
    });
  },[]);

  return(
    <AdminLayout header='DashBoard' id={1}>
      <div className='home-main-container' style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {isStockAvailable ?
          <>
            <DbHeader/>
            <DbCards/>
            <DbContent/>
          </> : null }
      </div>
    </AdminLayout>
  );
};
export default withRouter(DashBoard);
