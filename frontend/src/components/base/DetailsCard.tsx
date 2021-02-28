import React from "react";
import "../../assets/scss/base/detailsCard.scss";

interface IDetailsCard  {
    text:string,
    header:string,
    color:string
}

const DetailsCard = (props:IDetailsCard)=>{
  return (
    <div className='detailsCard-container' style={{ backgroundColor: props.color }}>
      <div>
        <div className='detailsCard-text'>
          <span>{props.text}</span>
        </div>
        <div className="detailsCard-header">
          <span>{props.header.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};
export default DetailsCard;
