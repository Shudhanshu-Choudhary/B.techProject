import React, { useState } from "react";
import "../assets/scss/sidebar.scss";
import { Icon } from "semantic-ui-react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";

const SideBar = ()=>{
  const sideBarData = require("./temp-json/sidebar.json").data;
  const history = useHistory();
  const [menu,showMenu] = useState(false);
  const [id,selectedId] = useState(1);
  // const [subItemId,selectedSubItemId] = useState(1);

  const renderSidebar = ()=>{
    const sideBarItems = [];
    sideBarData.map((sideBarItem)=>{
      let sideBarItemClsString = "sidebar-item";
      let sideBarItemTextClsString = "sidebar-item-text";
      let selected = false;

      let subItemsRenderHandler = ()=>{
        selectedId(sideBarItem.id);
        if(sideBarItem.tabs){
          menu ? showMenu(false) : showMenu(true);
        }
        else{
          history.push(sideBarItem.link);
        }

      };
      let renderSubItems = ()=>{
        let sideBarSubItemClsString = "sidebar-item";
        // let sideBarSubItemTextClsString = 'sidebar-item-text';
        let sideBarMenu = [];
        sideBarItem.tabs.map((subItems,index)=>{
          sideBarMenu.push(
            <NavLink to = {subItems.link} className={sideBarSubItemClsString} key={index}>
              {subItems.text}
            </NavLink>
          );
        });
        return sideBarMenu;
      };

      if(id === sideBarItem.id){
        sideBarItemClsString = "sidebar-item sidebar-item-selected";
        sideBarItemTextClsString = "sidebar-item-text sidebar-item-text-selected";
        selected = true;
      }
      sideBarItems.push(
        <div className={sideBarItemClsString} key={sideBarItem.id}>
          <div onClick={subItemsRenderHandler} style={{ display: "flex" }}>
            <Icon name={sideBarItem.icon} size={"large"} color={selected ? "blue" : "grey"} style={{ margin: "0 1rem" }}/>
            <div className={sideBarItemTextClsString}>
              <div>{sideBarItem.text}</div>
            </div>
          </div>
          <div>
            { menu && sideBarItem.tabs ? renderSubItems() : null}
          </div>
        </div>
      );
    });
    return sideBarItems;
  };
  return(
    <div className='sidebar-main-container'>
      <div className='sidebar-header-container'>
        <span>
          <span className = 'sidebar-header-color-primary'>M</span>
          <span className = 'sidebar-header-color-secondary'>arket </span>
          <span className = 'sidebar-header-color-secondary'>Buz</span>
          <span className = 'sidebar-header-color-primary'>Z</span>
        </span>
      </div>
      <div className='sidebar-item-container'>
        {renderSidebar()}
      </div>
    </div>
  );
};
export default SideBar;
