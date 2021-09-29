import React, { Component } from "react";
import auth from "../../services/authService";

class Logout extends Component {
  componentDidMount() {
    auth.logout("AUTH_SESSION_TOKEN");
    window.location = "/home";
  }
  render() {
    return null;
  }
}

export default Logout;
