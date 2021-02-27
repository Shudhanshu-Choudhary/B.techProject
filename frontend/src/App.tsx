import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../src/assets/scss/app.scss";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <div className={"App"}>
        <Router>
            <div className={"app-content"}>
                <Switch>
                    <Route path='/login' exact={true} component={Login}/>
                    <Route path='/register' exact={true} component={Register}/>
                    <Route path= '/' exact={true} component={Home}/>
                </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;
