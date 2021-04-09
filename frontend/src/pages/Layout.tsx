import React from "react";
import TopBar6 from "../components/home/TopBar6";
import Footer2 from "../components/home/Footer2";

export const Layout = ({ children }:{children:React.ReactNode})=>{
  return (
    <div>
      <TopBar6 />
      {children}
      <Footer2 />
    </div>
  );
};

