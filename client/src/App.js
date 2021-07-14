import React, { Component } from "react";
import "./App.css";
//import auth from "./services/authService";
import { ToastContainer, toast } from "react-toastify";
import ClientRoutes from "./components/Layout/ClientRoutes";
import NavBar from "./components/Layout/NavBar";
class App extends Component {
  state = {
    user: {
      id: Number.MIN_VALUE,
      firstName: "",
      lastName: "",
      userName: "",
      phoneNo: "",
      validationCode: Number.MIN_VALUE,
      isAdmin: 0,
    },
    activeTab: "Home",
    clientWidth: document.documentElement.clientWidth,
  };

  // async componentDidMount() {
  //   const user = auth.getCurrentUser();
  //   this.setState({ user });
  // }
  render() {
    const { user, activeTab, clientWidth } = this.state;
    window.addEventListener("resize", this.displayWindowSize);
    return (
      <>
        <ToastContainer autoClose={3000} hideProgressBar />
        <NavBar
          //handleSetActiveTab={this.handleSetActiveTab}
          user={user}
          activeTab={activeTab}
        />
        <div
          className="container-fluid h100"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <ClientRoutes
            user={user}
            clientWidth={clientWidth}
            activeTab={activeTab}
          />
          {/* <Footer clientWidth={clientWidth} /> */}
        </div>
      </>
    );
  }
}

export default App;
