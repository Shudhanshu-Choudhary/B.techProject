import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import { Message } from "semantic-ui-react";
import StorageService from "../services/storageService";
import AdminLayout from "../components/base/AdminLayout";
import "../assets/scss/pages/account.scss";
import { useDispatch } from "react-redux";
import { setUserIsLoggedIn } from "../state/reducers/userReducer";

const Account = ()=>{
  const history = useHistory();
  const dispatch = useDispatch();
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
  
  const items = [
    "You can now have cover images on blog pages",
    "Drafts will now auto-save while writing",
  ];
  useEffect(() => {
    const userData = JSON.parse(StorageService.getValueFromKey("userData") as string);
    // const logInData = JWTService.getUserFromJWTToken()
    setUserData({   user: userData.user , logInMethod: userData.logInMethod });
    console.log(userData.logInMethod);
  }, []);

  const handleLogout = () => {
    StorageService.clearStorage();
    dispatch(setUserIsLoggedIn(false));
    history.push("/");
  };
  const renderUser = () => {
    const user: any = {};

    if(userData.logInMethod === "facebook") {
      user.name = userData.user.facebookName;
      user.email = userData.user.facebookEmail;
      user.picture = userData.user.facebookPicture;
    } else if(userData.logInMethod === "google") {
      user.name = userData.user.googleName;
      user.email = userData.user.googleEmail;
      user.picture = userData.user.googlePicture;
    } else {
      user.name = userData.user.name;
      user.email = userData.user.email;
      user.picture = userData.user.picture;
    }
    console.log(user);
    console.log(userData);
    
    return (
    // <Card>
    //   <Image src={user.picture || "https://react.semantic-ui.com/images/avatar/large/matthew.png"} wrapped ui={false} />
    //   <Card.Content>
    //     <Card.Header>{user.name}</Card.Header>
    //     <Card.Meta>
    //       <span className='date'>{user.email}</span>
    //     </Card.Meta>
    //     <Card.Description>
    //                   Matthew is a musician living in Nashville.
    //     </Card.Description>
    //   </Card.Content>
    //   <Card.Content extra>
    //     <Icon name='user' />
    //               22 Friends
    //   </Card.Content>
    // </Card>

      <div className='account-main-container'>
        <div className='settings-main-container'>
          <div className='settings-info-container'>
            <div className='settings-info-header'>
              <span>PERSONAL INFO</span>
            </div>
            <div className='settings-info-profile-container'>
              <div className='settings-info-profile-header'><span>Profile Picture</span></div>
              <div className='settings-info-profile-img'><img src={user.picture || "https://react.semantic-ui.com/images/avatar/large/matthew.png"} alt=''/></div>
            </div>
            <div className='settings-info-name-container'>
              <div className='settings-info-name-header'><span>Name</span></div>
              <div className='settings-info-name'><span>{user.name}</span></div>
            </div>
            <div className='settings-info-email-container'>
              <div className='settings-info-email-header'><span>Email</span></div>
              <div className='settings-info-email'><span>{user.email}</span></div>
            </div>
            <div className='settings-info-password-container'>
              <div className='settings-info-password-header'><span>Password</span></div>
              <div className='settings-info-password'><span>**********</span></div>
            </div>
          </div>
          <Message>
            <Message.List items={items} />
          </Message>
          <div onClick={handleLogout} className='settings-button'>
            <span>Logout</span>
          </div>
          <button type="button" id="checkout-button">Checkout</button>
        </div>
      </div>
    );
  };
  return(
    <AdminLayout header='Account' id={4}>
      {renderUser()}
    </AdminLayout>
  );
};
export default withRouter(Account);
