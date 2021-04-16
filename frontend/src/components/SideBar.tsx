import React from "react";
import PropTypes from "prop-types";
// import defaultbagIcon from "../../assets/images/Navbar icons/defaultbagIcon.png";
// import selectedbagIcon from "../../assets/images/Navbar icons/selectedBagIcon.png";
// import defaultAccountIcon from "../../assets/images/Navbar icons/defaultAccountIcon.png";
// import selectedAccountIcon from "../../assets/images/Navbar icons/selectedOrderIcon.png";
import "../assets/scss/sidebar.scss";
import { NavLink } from "react-router-dom";

const Topbar = (props:any)=>{
  let id = props.id;
  const topbarData = [
    { id: 1,text: "DashBoard",link: "/dashboard" },
    { id: 2,text: "Posts",link: "/posts" },
    { id: 3,text: "Account", link: "/account" }];

  const renderTopBar = ()=>{
    const topbarIcons:any = [];
    // const routeIconMap:any = {
    //   Bag: props.id === 1 ? selectedbagIcon : defaultbagIcon,
    //   Account: props.id === 2 ? selectedAccountIcon : defaultAccountIcon
    // };
    topbarData.map((icon,index)=>{
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

