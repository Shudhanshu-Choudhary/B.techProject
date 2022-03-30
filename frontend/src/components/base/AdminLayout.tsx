import React from "react";
import "../../assets/scss/components/layout.scss";
import Topbar from "../SideBar";

interface IProps {
    header: string,
    id:number
    children: React.ReactFragment
}
const AdminLayout = (props: IProps)=>{

  console.log(props);
  
  return(
    <div className='layout-container'>
      <div className='layout-content-container'>
        <Topbar id={props.id}/>
        <div className='layout-header'>
          {/*<Header primaryHeader={props.header}/>*/}
          {props.children}
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
