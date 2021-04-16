import React from "react";
import "../../assets/scss/components/layout.scss";
import SideBar from "../SideBar";

interface IProps {
    header: string,
    id:number
    children: React.ReactFragment
}
const AdminLayout = (props: IProps)=>{
  return(
    <div className='layout-container'>
      <div className='layout-content-container'>
        <SideBar id={props.id}/>
        <div className='layout-header'>
          {/*<Header primaryHeader={props.header}/>*/}
          {props.children}
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
