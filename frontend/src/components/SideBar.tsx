import React from "react";
import PropTypes from "prop-types";
import "../assets/scss/sidebar.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import StorageService from "../services/storageService";

const Topbar = (props:any) => {

  axios.interceptors.request.use(
    request =>  {
      if (request.url !== "/auth/login") {
        request.headers["token"] = StorageService.getValueFromKey("token");
      }
      return request;
    },
    error => {
      return Promise.reject(error);
    }
  );

  let id = props.id;
  console.log(props);
  

  const topbarData = [
    { id: 1,text: "DashBoard",link: "/dashboard" },
    { id: 2,text: "Picks",link: "/picks" },
    { id: 3,text: "Posts",link: "/posts" },
    { id: 4,text: "Account",link: "/account" }
  ];

  const renderTopBar = () => {

    const topbarIcons:any = [];

    topbarData.map((icon, index)=>{
      let clsName = "topbar-icon";
      if(icon.id === id){
        clsName = "topbar-icon topbar-icon-selected";
      }
      topbarIcons.push(
        <NavLink to={icon.link} className={clsName} key={index}>
          <span>{icon.text}</span>
        </NavLink>
      );
    });
    return topbarIcons;
  };
  return(
    <div className='topbar-main-container'>
      <div className='topbar-container'>
        <NavLink to={"/"} className='topbar-store-container'>
          MarketBuzz
        </NavLink>
        <div className='topbar-icon-container'>
          {renderTopBar()}
        </div>
      </div>
    </div>
  );
};

Topbar.propTypes = {
  id: PropTypes.number
};
export default Topbar;

