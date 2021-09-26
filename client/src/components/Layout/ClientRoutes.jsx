import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../Home/Home";
import LoginForm from "../Login/LoginForm";
import ForgotPWEmailForm from "../ForgottenPW/ForgotPWEmailForm";
import ExpiredLink from "../ForgottenPW/ExpiredLink";
import Logout from "../Logout/Logout";
import RegisterForm from "../Register/RegisterForm";
import ValidationCodeForm from "./../Login/ValidationCodeForm";
import ProtectedRoute from "../Shared/ProtectedRoute";
const ClientRoutes = ({ user, clientWidth, handleSetActiveTab, activeTab }) => {
  return (
    <Switch>
      {/* <ProtectedRoute
      path="/updatePassword/:id"
      exact
      render={(props) => (
        <UpdatePassword {...props} user={user} clientWidth={clientWidth} />
      )}
    />

    <Route
      path="/:userId/:token"
      exact
      render={(props) => (
        <UpdateForgottenPWForm
          {...props}
          user={user}
          handleSetActiveTab={handleSetActiveTab}
          clientWidth={clientWidth}
        />
      )}
    /> */}
      <Route
        path="/authenticateSMS"
        exact
        render={(props) => (
          <ValidationCodeForm
            {...props}
            user={user}
            clientWidth={clientWidth}
          />
        )}
      />
      <Route
        path="/register"
        render={(props) => (
          <RegisterForm
            {...props}
            activeTab={activeTab}
            handleSetActiveTab={handleSetActiveTab}
            clientWidth={clientWidth}
          />
        )}
      />
      <Route
        path="/login"
        exact
        render={(props) => (
          <LoginForm
            {...props}
            activeTab={activeTab}
            handleSetActiveTab={handleSetActiveTab}
            clientWidth={clientWidth}
          />
        )}
      />
      <Route path="/passwordRecovery" component={ForgotPWEmailForm} />
      <Route path="/expiredLink" component={ExpiredLink} />
      <Route path="/logout" component={Logout} />
      <Route
        path="/home"
        render={(props) => (
          <Home
            {...props}
            activeTab={activeTab}
            handleSetActiveTab={handleSetActiveTab}
            clientWidth={clientWidth}
          />
        )}
      />
      <Redirect from="/" exact to="/home" />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default ClientRoutes;
