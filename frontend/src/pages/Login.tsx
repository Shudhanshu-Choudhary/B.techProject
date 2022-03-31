import React, { useState } from "react";
import { Button, Divider, Form, Icon, Input } from "semantic-ui-react";
import "../assets/scss/pages/login.scss";
import { useHistory } from "react-router-dom";
import AuthBackendApiService from "../services/authBackendApi.service";
import { Layout } from "./Layout";
import { useDispatch } from "react-redux";
import StorageService from "../services/storageService";

interface IState {
    [key: string]: any; // or the type of your input
    email: string,
    password: string
}

const Login = (props) => {
    const history = useHistory();
    const [state, setState] = useState({});
    const changeHandler = (e: any): void => {
      setState(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    }


    const onSubmitHandler = async () => {
      try {
        const res = await AuthBackendApiService.login(state);
        StorageService.setKey("userData", JSON.stringify({ user: res.data.user }));
        StorageService.setKey("token", res.data.token); 
        console.log({res});
        window.location.href= "/";
      } catch (e) {
        console.log(e.response);
      }
      // props.history.push("/");
    }

    const goToRegister = () => {
      history.push("/register");
    }
      return(
        <Layout>
          <div className='signin-main-container'>
            <div className='signin-content-container'>
              <div className='signin-header'>
                <span>Welcome to Market Buzz</span>
              </div>
              <Form>
                <div className='signin-email-container'>
                  <div className='signin-email-header'><span>Email Address</span></div>
                  <Input onChange={changeHandler}
                    type='email'
                    name='email'
                    placeholder='johndoe@gmail.com'
                    icon='user'
                    iconPosition='left'
                    style={{ width: "100%" }}/>
                </div>
                <div className='signin-password-container'>
                  <div className='signin-password-header'>
                    <span className='signin-password-header-primary'>Password</span>
                  </div>
                  <Input onChange={changeHandler}
                    icon='lock'
                    iconPosition='left'
                    name='password'
                    type='password'
                    placeholder='**********'
                    style={{ width: "100%" }}/>
                </div>
              </Form>
              <div onClick={onSubmitHandler} className='signin-button'>
                <span>Sign In</span>
              </div>
              <Divider horizontal>Or</Divider>
              <div style={{ display: "flex",justifyContent: "space-around" }}>
                <Button color='facebook' onClick={() => AuthBackendApiService.loginWithFacebook()}>
                  <Icon name='facebook' /> Facebook
                </Button>
                <Button color='google plus' onClick={() => AuthBackendApiService.loginWithGoogle()}>
                  <Icon name='google' /> Google
                </Button>
              </div>

              <div className='signin-not-registered'>
                <h5>Not registered yet?</h5>
              </div>
              <div onClick={goToRegister} className='signin-register-button signin-button '>
                <span>Register</span>
              </div>
            </div>
          </div>
        </Layout>
      );
  
      }

export default Login;
