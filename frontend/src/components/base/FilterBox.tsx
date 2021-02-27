import React from 'react';
import {Input} from "semantic-ui-react";
import "../../assets/scss/base/filterBox.scss";

const FilterBox = ()=>{
    return(
        <div className='filter-box-container'>
            <div className='searchbox'>
                <form>
                    <div className='searchbox-text'>
                        <Input  action={{icon:'search'}} placeholder='Search...' />
                    </div>
                </form>
            </div>
        </div>

    )
}
export default FilterBox;
