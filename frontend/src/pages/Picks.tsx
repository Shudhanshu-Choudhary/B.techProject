import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import AdminLayout from "../components/base/AdminLayout";
import "../assets/scss/pages/account.scss";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Button } from "@material-ui/core";
import { STOCK_NAME_LIST } from "../constant";
import UserService from "../services/user.service";
import StorageService from "../services/storageService";

const Picks = () => {
  const [userPicks, setUserPicks] = useState([]);
  useEffect(() => {
    const userData = JSON.parse(StorageService.getValueFromKey("userData") as string);
    setUserPicks(userData.stockPicks || []);
  }, []);

  const saveUserPicks = async () => {
    const res = await UserService.saveUserPicks(userPicks);
    console.log(res);
  };

  const renderPicks = () => {
    const picks: JSX.Element[] = [];
    userPicks.forEach((pick) => {
      picks.push(<div>{pick}</div>);
    });
    return picks;
  };

  const updatePicks = (value: string) => {
    const updatedPicks: string[] = userPicks.slice();
    updatedPicks.push(value);
    setUserPicks(updatedPicks);
  };

  return(
    <AdminLayout header='My Picks' id={2}>
      <Autocomplete
        id="combo-box-demo"
        onChange={(e, newValue) => {updatePicks(newValue);} }
        options={STOCK_NAME_LIST}
        getOptionLabel={(option: any) => option}
        style={{ width: 300 }}
        renderInput={(params: any) => <TextField {...params} label="Combo box" variant="outlined" />}
      />
      {userPicks && userPicks.length ? renderPicks() : "No user picks"}
      <Button onClick={saveUserPicks}>Save</Button>
    </AdminLayout>
  );
};
export default withRouter(Picks);
