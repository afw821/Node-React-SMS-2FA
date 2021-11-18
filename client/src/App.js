import React, { Component } from "react";
import "./App.css";
import auth from "./services/authService";
import { ToastContainer, toast } from "react-toastify";
import ClientRoutes from "./components/Layout/ClientRoutes";
import NavBar from "./components/Layout/NavBar";
import { Container, Header, Content, FlexboxGrid, Footer } from "rsuite";
class App extends Component {
  state = {
    user: {
      id: "",
      firstName: "",
      lastName: "",
      userName: "",
      phoneNo: "",
      validationCode: "",
      isAdmin: 0,
    },
    activeTab: "Home",
    clientWidth: document.documentElement.clientWidth,
    validPwToken: null,
  };

  componentDidMount() {
    const user = auth.getTokenFromCookie();

    this.setState({ user });
  }

  handleSetActiveTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  handleSetUser = (user) => {
    this.setState({ user });
  };

  handleSetValidPwToken = (validPwToken) => {
   
    this.setState({ validPwToken });
  };

  displayWindowSize = () => {
    let clientWidth = document.documentElement.clientWidth;
    this.setState({ clientWidth });
  };

  // async componentDidMount() {
  //   const user = auth.getCurrentUser();
  //   this.setState({ user });
  // }
  render() {
    const { user, activeTab, clientWidth, validPwToken } = this.state;
    window.addEventListener("resize", this.displayWindowSize);
    return (
      <>
        <Container>
          <Header>
            <NavBar
              handleSetActiveTab={this.handleSetActiveTab}
              user={user}
              activeTab={activeTab}
            />
          </Header>
          <Content className="h100" style={{ backgroundColor: "#DAE1E8" }}>
            <ToastContainer autoClose={3000} hideProgressBar />
            <ClientRoutes
              user={user}
              clientWidth={clientWidth}
              activeTab={activeTab}
              handleSetActiveTab={this.handleSetActiveTab}
              token={validPwToken}
              handleSetValidPwToken={this.handleSetValidPwToken}
              handleSetUser={this.handleSetUser}
            />
          </Content>
        </Container>
      </>
    );
  }
}

export default App;
