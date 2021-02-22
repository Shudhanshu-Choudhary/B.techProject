import React from "react";
import { Form,Input } from "semantic-ui-react";
import "../assets/scss/login.scss";
import "semantic-ui-css/semantic.min.css";
import { withRouter } from "react-router-dom";
import Logger from "../lib/logger";
import AuthBackendApiService from "../services/authBackendApi.service";
import { toast } from "react-toastify";
import StorageService from "../services/storageService";

interface IState {
    [key: string]: any; // or the type of your input
    email: string,
    password: string
}

class Login extends React.Component<any,IState>{

  componentDidMount() {
    if(StorageService.getValueFromKey("userId")) {
      this.props.history.push("/");
    }
  }

    changeHandler = (e: any): void => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    continue=async ()=>{
      try {
        const res = await AuthBackendApiService.login(this.state);
        if(res.status === 200) {
          toast.success("Login successful.");
          StorageService.getValueFromKey("userId");
          StorageService.setKey("userId", res.data["_id"]);
          this.props.history.push("/");
        } else {
          toast.error("Invalid credentials.");
        }
      } catch (e) {
        Logger.logError(e);
        toast.error("Invalid credentials.");
      }
    }

  goToRegister = () => {
    this.props.history.push("/register");
  }
  render() {
    return(
      <div className='signin-main-container'>
        <div className='signin-content-container'>
          <div className='signin-header'>
            <span>Welcome to Elite Cars</span>
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
