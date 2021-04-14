import React, { createContext, useEffect, useState } from "react";
import DataService from "../services/data.service";

export const StockDataContext = createContext([]);

export const StockDataProvider = ({ children }:{children:React.ReactNode})=>{
  const [data,setData] = useState({});
  useEffect(()=>{
    DataService.fetchData()
      .then((res)=>{
        console.log("api called");
        console.log(res.data);
        setData(res.data);
      })
      .catch((err:any)=>{
        console.log(err);
      })
    ;
  },[]);
  return <StockDataContext.Provider value={[data, setData]}>{children}</StockDataContext.Provider>;
};

