import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../src/assets/scss/app.scss";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashBoard from "./pages/DashBoard";
import Post from "./pages/Post";
import Account from "./pages/Account";
import Home from "./pages/Home";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Theme } from "./theme";
import GlobalCss from "./components/home/styles/jss/GlobalCss";

function App() {
  return (
    <MuiThemeProvider theme={Theme}>
      <GlobalCss>
        <div className={"App"}>
          <Router>
            <div className={"app-content"}>
              <Switch>
                <Route path='/' exact={true} component={Home}/>
                <Route path='/login' exact={true} component={Login}/>
                <Route path='/register' exact={true} component={Register}/>
                <Route path= '/posts' exact={true} component={Post}/>
                <Route path= '/account' exact={true} component={Account}/>
                <Route path= '/dashboard' exact={true} component={DashBoard}/>
              </Switch>
            </div>
          </Router>
        </div>
      </GlobalCss>
    </MuiThemeProvider>
  );
}

export default App;
