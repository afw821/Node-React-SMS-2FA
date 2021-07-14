import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../Home/Home";
const ClientRoutes = ({
  user,
  clientWidth,
  handleRemoveFromCart,
  handleSetActiveTab,
  calculateQuantity,
  totalPrice,
  productsInCart,
  handleAddToCart,
  activeTab,
}) => {
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
    <Route path="/logout" component={Logout} /> */}
      <Route
        path="/home"
        render={(props) => (
          <Home
            {...props}
            //activeTab={activeTab}
            //handleSetActiveTab={handleSetActiveTab}
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
