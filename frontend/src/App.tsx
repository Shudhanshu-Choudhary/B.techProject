import React, {useEffect} from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../src/assets/scss/app.scss";
import Login from "./pages/Login";
import AuthBackendApiService from "./services/authBackendApi.service";
import Register from "./pages/Register";
import DashBoard from "./pages/DashBoard";
import Account from "./pages/Account";
import Home from "./pages/Home";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Theme } from "./theme";
import GlobalCss from "./components/home/styles/jss/GlobalCss";
import Posts from "./pages/Posts";
import Picks from "./pages/Picks";
import axios from "axios";
import StorageService from "./services/storageService";
import { useDispatch, useSelector } from "react-redux";
import { setUserIsLoggedIn } from "./state/reducers/userReducer";
import ProtectedRoutes from "./pages/ProtectedRoutes";

axios.interceptors.request.use(
  request =>  {
    if (request.url !== "/auth/login") {
      request.headers["token"] = StorageService.getValueFromKey("token");
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);
// import { loadStripe } from "@stripe/stripe-js";
// import baseUrl from "./services/baseUrl";
// const stripePromise = loadStripe("pk_test_51IgNAKFCd7OP6oqZdgs2Sh9nVR4Da7ow9JT7czEkeCHuDm392FaKNhNgB7fT2DE74Ga3yPSD9UbvmfIqBZRUxOxp00EXFe8D9V");

// const handleClick = async () => {
//   const stripe = await stripePromise;
//   const response = await fetch(`${baseUrl}create-checkout-session`, {
//     method: "POST",
//   });
//   const session = await response.json();
//   // When the customer clicks on the button, redirect them to Checkout.
//   const result = await stripe.redirectToCheckout({
//     sessionId: session.id,
//   });
//   if (result.error) {
//     // If `redirectToCheckout` fails due to a browser or network
//     // error, display the localized error message to your customer
//     // using `result.error.message`.
//   }
// };

function App() {
  const dispatch = useDispatch();
  const query = new URLSearchParams(location.search);
  const token = query.get("token") || StorageService.getValueFromKey("token");

  const getUser = async () => {
    const user = await AuthBackendApiService.getUserFromToken(token);
    const userData = JSON.stringify(user.data);
    StorageService.setKey("userData", userData);
  };

  useEffect(() => {
    if (token) {
      StorageService.setKey("token", token);
      dispatch(setUserIsLoggedIn(true));
      getUser();
    }
  }, []);

  const isUserLogged = useSelector((state:any) => state.user.isLogged);

  console.log(isUserLogged);
  
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
                <ProtectedRoutes path='/posts' exact={true} Component={Posts} isUserLogged={isUserLogged}/>
                <ProtectedRoutes path='/account' exact={true} Component={Account} isUserLogged={isUserLogged} />
                <ProtectedRoutes path='/picks' exact={true} Component={Picks} isUserLogged={isUserLogged} />
                <ProtectedRoutes path='/dashboard' exact={true} Component={DashBoard} isUserLogged={isUserLogged} />
              </Switch>
            </div>
          </Router>
        </div>
      </GlobalCss>
    </MuiThemeProvider>
  );
}

export default App;
