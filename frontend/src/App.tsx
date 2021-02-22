import React from "react";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import CarDetails from "./components/CarDetails";
import Register from "./components/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BookingCar from "./components/BookingCar";
import { PrivateRoute } from "./protectedRoute.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return(
    <div className='app'>
      <ToastContainer />
      <Router>
        <div className='app-content'>
          <Switch>
            <PrivateRoute path='/' exact={true} component={HomePage} />
            <Route path='/login' exact={true} component={Login} />
            <Route path='/register' exact={true} component={Register} />
            <PrivateRoute path='/bookings' component={CarDetails} />
            <PrivateRoute path='/book' component={BookingCar} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
