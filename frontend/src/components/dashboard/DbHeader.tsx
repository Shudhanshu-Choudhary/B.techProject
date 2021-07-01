import React from "react";
import "../../assets/scss/components/db_header.scss";
import { Card, Button } from "semantic-ui-react";
import DashboardBackendApiService from "../../services/dashboardBackendApi.service";

const DbHeader = () => {
  return(
    <div className={"dashboard-header-container"}>
      <div className="dashboard-header-options">
        <Card className={"dashboard-header-option-container dashboard-header-dashboard-options"}>
          <div className={"dashboard-header-option-header"}>
            <h1>Dashboard</h1>
          </div>
          <Card.Content className={"dashboard-header-option-choices"}>
            <Button className={"dashboard-header-option-choice"}><h4>Overall</h4></Button>
            <Button className={"dashboard-header-option-choice"} onClick={() => DashboardBackendApiService.getData()}><h4>MyPicks</h4></Button>
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
