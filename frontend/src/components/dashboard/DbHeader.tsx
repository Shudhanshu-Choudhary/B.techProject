import React from "react";
import "../../assets/scss/components/db_header.scss";
//import { Card } from "semantic-ui-react";
import { Button } from "@material-ui/core";
import DashboardBackendApiService from "../../services/dashboardBackendApi.service";
// import StockFormatterService from "../../services/stockFormatter.service";
import { useDispatch } from "react-redux";
import {setStockData} from "../../state/reducers/dashboardReducer";
import DataService from "../../services/data.service";

const DbHeader = () => {

  const dispatch = useDispatch();

  const myPicksClickHandler = async () => {
    const { status, data } = await DashboardBackendApiService.getData();

    if(status === 200) {
      dispatch(setStockData(data));
    }
  };

  const overallClickHandler = async () => {
    DataService.fetchData().then((response: any) => {
      const data = response.data;
      dispatch(setStockData(data));
    });
  };

  return(
    <div className={"dashboard-header-container"}>
      <div className="dashboard-header-options">
        <div className={"dashboard-header-option-container dashboard-header-dashboard-options"}>
          <div className={"dashboard-header-option-header"}>
            <h1>Dashboard</h1>
          </div>
          <div className={"dashboard-header-option-choices"}>
            <Button className={"dashboard-header-option-choice"} onClick={overallClickHandler}><h4>Overall</h4></Button>
            <Button className={"dashboard-header-option-choice"} onClick={myPicksClickHandler}><h4>MyPicks</h4></Button>
          </div>
        </div>
        <div className={"dashboard-header-option-container dashboard-header-stat-options"}>
          <div className={"dashboard-header-option-header"}>
            <h1>Stats</h1>
          </div>
          <div className={"dashboard-header-option-choices"}>
            <Button className={"dashboard-header-option-choice"}><h4>Today</h4></Button>
            <Button className={"dashboard-header-option-choice"}><h4>Weekly</h4></Button>
            <Button className={"dashboard-header-option-choice"}><h4>Monthly</h4></Button>
          </div>
        </div>
        <div className={"dashboard-header-option-container dashboard-header-type-options"}>
          <div className={"dashboard-header-option-header"}>
            <h1>Type</h1>
          </div>
          <div className={"dashboard-header-option-choices"}>
            <Button className={"dashboard-header-option-choice"}><h4>Comments</h4></Button>
            <Button className={"dashboard-header-option-choice"}><h4>Posts</h4></Button>
          </div>
        </div>
      </div>
    </div>);
};

export default DbHeader;
