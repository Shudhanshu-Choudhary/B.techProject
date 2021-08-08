import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import AdminLayout from "../components/base/AdminLayout";
import "../assets/scss/pages/account.scss";
import "../assets/scss/pages/picks.scss";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Button } from "@material-ui/core";
import { STOCK_NAME_LIST } from "../constant";
import UserService from "../services/user.service";
import StorageService from "../services/storageService";
import { Icon } from "semantic-ui-react";

const Picks = () => {
  const [userPicks, setUserPicks] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(StorageService.getValueFromKey("userData") as string);
    console.log(userData);
    setUserPicks(userData.stockPicks || []);
    console.log(userPicks);
  }, []);

  const saveUserPicks = async () => {
    const res = await UserService.saveUserPicks(userPicks);
    console.log(res);
  };

  const renderPicks = () => {
    const picks: JSX.Element[] = [];
    userPicks.forEach((pick, index) => {
      picks.push(
        <div className='picks-selected-item'>
          <span>{pick}</span>
          <Icon className='transform-icon' name='delete' color='red' size='large' onClick={() => deletePicks(index)}/>
        </div>
      );
    });
    return picks;
  };

  const updatePicks = (value: string) => {
    const updatedPicks: string[] = userPicks.slice();
    updatedPicks.push(value);
    setUserPicks(updatedPicks);
  };

  const deletePicks = (index: number) => {
    const updatedPicks = userPicks.slice();
    updatedPicks.splice(index, 1);
    setUserPicks(updatedPicks);
  };

  return(
    <AdminLayout header='My Picks' id={2}>
      <div className='picks-container'>
        <div className='picks-input-box'>
          <Autocomplete
            id="combo-box-demo"
            onChange={(e, newValue) => {updatePicks(newValue);} }
            options={STOCK_NAME_LIST}
            getOptionLabel={(option: any) => option}
            className='picks-input'
            renderInput={(params: any) => <TextField {...params} label="Combo box" variant="outlined" />}
          />
        </div>
        {userPicks && userPicks.length ? renderPicks() : "No user picks"}
        <Button onClick={saveUserPicks}>Save</Button>
      </div>
    </AdminLayout>
  );
};
export default withRouter(Picks);
