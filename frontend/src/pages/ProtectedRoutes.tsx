import React from "react";
import { Redirect, Route } from "react-router";

function ProtectedRoutes({isUserLogged: isUserLogged , Component: Component , ...rest}) {
    return ( 
        <Route 
          {...rest}
           render = { (props) => {
            return isUserLogged ? (
                <Component {...props}/>
          ) : (
                <Redirect to={{pathname: "/login", state: props.location}} />
          )
           } 
        }
        />
     )
}

export default ProtectedRoutes;