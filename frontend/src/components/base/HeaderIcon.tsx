import React from 'react';
import {Button, Icon} from "semantic-ui-react";
import "../../assets/scss/base/headerIcon.scss";
import FilterBox from "./FilterBox";

interface ITableViewProps{
    filter:boolean,
    header:string
}

const HeaderIcon = (props:ITableViewProps)=>{
    return(
        <div className = 'hi-main-container'>
            <div className='hi-filter-container'>
                {props.filter?(
                    <FilterBox/>
                ):null}
            </div>
            <div className='hi-content-container'>
                <div className='hi-header'>
                    <span>{props.header}</span>
                </div>
                <div className="hi-access-buttons-container">
                    <Button icon labelPosition='left' color='blue'><Icon name='copy' />COPY</Button>
                    <Button icon labelPosition='left' color='blue'><Icon name='print' />PRINT</Button>
                    <Button icon labelPosition='left' color='blue'><Icon name='file pdf' />PDF</Button>
                    <Button icon labelPosition='left' color='blue'><Icon name='list' />EXCEL</Button>
                </div>
            </div>
        </div>
    )
}
export default HeaderIcon;
