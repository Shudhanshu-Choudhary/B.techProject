import React from "react";
import "../../assets/scss/base/editCard.scss";
import { Icon } from "semantic-ui-react";

interface IEditCard{
    primaryHeader:string,
    secondaryheader:string,
    description:string
}

const EditCardPostView = (props:IEditCard)=>{
  return(
    <div className="editCard-container">
      <div className="editCard-header-primary">
        <div className="editCard-header-text">
          <span>{props.primaryHeader}</span>
        </div>
        <div className='editCard-header-button-container'>
          <div className="editCard-header-button-edit">
            <Icon className='transform-icon' name='edit outline' color='green' size='large'/>
          </div>
          <div className="editCard-header-button-delete">
            <Icon className='transform-icon' name='delete' color='red' size='large'/>
          </div>
        </div>
      </div>
      <div className="editCard-header-secondary">
        <span>{props.secondaryheader}</span>
      </div>
      <div className="editCard-content-container">
        <div className="editCard-content-description">
          <span>{props.description}</span>
        </div>
      </div>
    </div>
  );
};
export default EditCardPostView;
