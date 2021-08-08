import React, { createContext, useEffect, useState } from "react";
import DataService from "../services/data.service";
import { useDispatch } from "react-redux";
import { setStockData } from "../state/reducers/dashboardReducer";

export const StockDataContext = createContext([]);

export const StockDataProvider = ({ children }:{children:React.ReactNode})=>{
  const [data,setData] = useState({});
  const dispatch = useDispatch();
  useEffect(()=>{
    DataService.fetchData()
      .then((res)=>{
        console.log("api called");
        console.log(res.data);
        dispatch(setStockData(res.data));
        setData(res.data);
      })
      .catch((err:any)=>{
        console.log(err);
      })
    ;
  },[]);
  return <StockDataContext.Provider value={[data, setData]}>{children}</StockDataContext.Provider>;
};

