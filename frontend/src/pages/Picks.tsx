import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import AdminLayout from "../components/base/AdminLayout";
import "../assets/scss/pages/account.scss";
import "../assets/scss/pages/picks.scss";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Button } from "@material-ui/core";
import { STOCK_NAME_LIST } from "../constant";
import UserService from "../services/user.service";
import { Icon } from "semantic-ui-react";

const Picks = () => {
  const [userPicks, setUserPicks] = useState([]);

  useEffect(() => {
    getUserPicks();
  }, []);

  const saveUserPicks = async () => {
    const res = await UserService.saveUserPicks(userPicks);
    console.log(res);
  };

  const getUserPicks = async () => {
    const response = await UserService.getUserPicks();
    if (Array.isArray(response.data)) {
      setUserPicks(response.data);
    } else {
      setUserPicks([]);
    }
  };
  const renderPicks = () => {
    const picks: JSX.Element[] = [];
    userPicks.forEach((pick, index) => {
      picks.push(
        <div className='picks-selected-item' key={index}>
          <span>{pick}</span>
          <Icon className='transform-icon pointer' name='delete' color='white' size='large' onClick={() => deletePicks(index)}/>
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
            className='picks-input pointer'
            renderInput={(params: any) => <TextField {...params} label="Combo box" variant="outlined" />}
          />
        </div>
        {userPicks?.length ? renderPicks() : null}
        <Button className="picks-save-btn" onClick={saveUserPicks} variant="contained" color="primary">Save</Button>
      </div>
    </AdminLayout>
  );
};
export default withRouter(Picks);
