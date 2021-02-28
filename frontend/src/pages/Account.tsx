import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import Layout from "../components/base/Layout";
import StorageService from "../services/storageService";

const Account = ()=>{
  const history = useHistory();

  const [userData, setUserData] = useState({ user: {
    name: null,
    email: null,
    facebookEmail: null,
    facebookName: null,
    facebookPicture: null,
    googleName: null,
    googleEmail: null,
    googlePicture: null,
    picture: null,
  }, logInMethod: null });
  useEffect(() => {
    const userData = JSON.parse(StorageService.getValueFromKey("userData") as string);
    setUserData(userData);
  }, []);

  const handleLogout = () => {
    StorageService.clearStorage();
    history.push("/login");
  };
  const renderUser = () => {
    const user: any = {};
    if(userData.logInMethod && userData.logInMethod.toLowerCase() === "facebook") {
      user["name"] = userData.user.facebookName;
      user["email"] = userData.user.facebookEmail;
      user["picture"] = userData.user.facebookPicture;
    } else if(userData.logInMethod && userData.logInMethod.toLowerCase() === "google") {
      user["name"] = userData.user.googleName;
      user["email"] = userData.user.googleEmail;
      user["picture"] = userData.user.googlePicture;
    }
    return (
      <Card>
        <Image src={user.picture || "https://react.semantic-ui.com/images/avatar/large/matthew.png"} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{user.name}</Card.Header>
          <Card.Meta>
            <span className='date'>{user.email}</span>
          </Card.Meta>
          <Card.Description>
                        Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name='user' />
                    22 Friends
        </Card.Content>
      </Card>);
  };
  return(
    <Layout header='DashBoard'>
      <h1>Settings:</h1>
      {renderUser()}
      <Button onClick={handleLogout}>Logout</Button>
    </Layout>
  );
};
export default withRouter(Account);
