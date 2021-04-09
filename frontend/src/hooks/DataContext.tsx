import React, { createContext, useEffect, useState } from "react";
import DataService from "../services/data.service";
import Logger from "../lib/logger";

export const DataContext = createContext({
  category: "",
});

export const DataProvider = ({ children }:{children:React.ReactNode})=>{
  const providerValue = useProvider();
  // @ts-ignore
  return <DataContext.Provider value={providerValue}>{children}</DataContext.Provider>;
};

const useProvider = async ()=>{
  const [data,setData] = useState({});
  await useEffect(()=>{
    DataService.fetchData()
      .then((res)=>{
        Logger.log("api called");
        Logger.log(res.data);
        setData(res.data);
      })
      .catch((err:any)=>{
        Logger.log(err);
      })
    ;
  },[]);
  return data;
};
