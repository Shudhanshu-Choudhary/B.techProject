import React from "react";
import "../../assets/scss/base/header.scss";

interface IHeader{
    primaryHeader:string
}

const Header = (props:IHeader)=>{
  return(
    <div className="header-container">
      <span>{props.primaryHeader}</span>
    </div>
  );
};
export default Header;
