import React from "react";
import auth from "../../services/authService";
import { Route, Redirect } from "react-router-dom";

const ProtectedRouteValidPW = ({
  path,
  component: Component,
  render,
  token,
  ...rest
}) => {
  console.log("...rest of props for protected route", token);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.decodeToken(token)) {
          console.log("in this if statement");
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        } else {
          console.log("in this else statement");
          return Component ? <Component {...props} /> : render(props);
        }
      }}
    />
  );
};

export default ProtectedRouteValidPW;
