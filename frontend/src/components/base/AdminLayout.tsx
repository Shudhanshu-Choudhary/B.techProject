import React from "react";
import Header from "./Header";
import "../../assets/scss/components/layout.scss";
import SideBar from "../SideBar";

interface IProps {
    header: string
    children: React.ReactFragment
}
const AdminLayout = (props: IProps)=>{
  return(
    <div className='layout-container'>
      <div className='layout-content-container'>
        <SideBar/>
        <div className='layout-header'>
          <Header primaryHeader={props.header}/>
          {props.children}
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
