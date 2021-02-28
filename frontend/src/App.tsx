import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../src/assets/scss/app.scss";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Account from "./pages/Account";

function App() {
  return (
    <div className={"App"}>
      <Router>
        <div className={"app-content"}>
          <Switch>
            <Route path='/login' exact={true} component={Login}/>
            <Route path='/register' exact={true} component={Register}/>
            <Route path= '/posts' exact={true} component={Post}/>
            <Route path= '/account' exact={true} component={Account}/>
            <Route path= '/' exact={true} component={Home}/>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
