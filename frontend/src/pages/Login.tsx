import React from "react";
import {Button, Divider, Form, Icon, Input} from "semantic-ui-react";
import "../assets/scss/pages/login.scss";
import { withRouter } from "react-router-dom";
import AuthBackendApiService from "../services/authBackendApi.service";

interface IState {
    [key: string]: any; // or the type of your input
    email: string,
    password: string
}

class Login extends React.Component<any,IState>{

    changeHandler = (e: any): void => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    continue=()=>{
        this.props.history.push("/");
    }

    goToRegister = () => {
        this.props.history.push("/register");
    }
    render() {
        return(
            <div className='signin-main-container'>
                <div className='signin-content-container'>
                    <div className='signin-header'>
                        <span>Welcome to Ticker Chart</span>
                    </div>
                    <Form>
                        <div className='signin-email-container'>
                            <div className='signin-email-header'><span>Email Address</span></div>
                            <Input onChange={this.changeHandler}
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
                            <Input onChange={this.changeHandler}
                                   icon='lock'
                                   iconPosition='left'
                                   name='password'
                                   type='password'
                                   placeholder='**********'
                                   style={{ width: "100%" }}/>
                        </div>
                    </Form>
                    <div onClick={this.continue} className='signin-button'>
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
                    <div onClick={this.goToRegister} className='signin-register-button signin-button '>
                        <span>Register</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
