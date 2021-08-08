import React from "react";
import "../../assets/scss/components/db_header.scss";
import { Button, Card } from "semantic-ui-react";
import DashboardBackendApiService from "../../services/dashboardBackendApi.service";
import StockFormatterService from "../../services/stockFormatter.service";
import { useDispatch, useSelector } from "react-redux";
import { setStockData } from "../../state/reducers/dashboardReducer";

const DbHeader = () => {
  const count = useSelector((state: any) => state.dashboard);
  const dispatch = useDispatch();
  const myPicksClickHandler = async () => {
    const { status, data } = await DashboardBackendApiService.getData();
    console.log(count);
    if(status === 200) {
      console.log(data);
      dispatch(setStockData(data));
      StockFormatterService.convertStocksToArray(data);
    }
  };

  return(
    <div className={"dashboard-header-container"}>
      <div className="dashboard-header-options">
        <Card className={"dashboard-header-option-container dashboard-header-dashboard-options"}>
          <div className={"dashboard-header-option-header"}>
            <h1>Dashboard</h1>
          </div>
          <Card.Content className={"dashboard-header-option-choices"}>
            <Button className={"dashboard-header-option-choice"}><h4>Overall</h4></Button>
            <Button className={"dashboard-header-option-choice"} onClick={myPicksClickHandler}><h4>MyPicks</h4></Button>
          </Card.Content>
        </Card>
        <Card className={"dashboard-header-option-container dashboard-header-stat-options"}>
          <div className={"dashboard-header-option-header"}>
            <h1>Stats</h1>
          </div>
          <Card.Content className={"dashboard-header-option-choices"}>
            <Button className={"dashboard-header-option-choice"}><h4>Today</h4></Button>
            <Button className={"dashboard-header-option-choice"}><h4>Weekly</h4></Button>
            <Button className={"dashboard-header-option-choice"}><h4>Monthly</h4></Button>
          </Card.Content>
        </Card>
        <Card className={"dashboard-header-option-container dashboard-header-type-options"}>
          <div className={"dashboard-header-option-header"}>
            <h1>Type</h1>
          </div>
          <Card.Content className={"dashboard-header-option-choices"}>
            <Button className={"dashboard-header-option-choice"}><h4>Comments</h4></Button>
            <Button className={"dashboard-header-option-choice"}><h4>Posts</h4></Button>
          </Card.Content>
        </Card>
      </div>
    </div>);
};

export default DbHeader;
