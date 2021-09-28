import React from "react";
import { getTokenFromCookie } from "../../services/authService";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  path,
  component: Component,
  render,
  token,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!getTokenFromCookie()) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        } else {
          return Component ? <Component {...props} /> : render(props);
        }
      }}
    />
  );
};

export default ProtectedRoute;
