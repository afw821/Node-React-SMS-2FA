import React, { Component } from "react";
import "./App.css";
//import auth from "./services/authService";
import { ToastContainer, toast } from "react-toastify";
import ClientRoutes from "./components/Layout/ClientRoutes";
import NavBar from "./components/Layout/NavBar";
import { Container, Header, Content, FlexboxGrid, Footer } from "rsuite";
class App extends Component {
  state = {
    user: {
      id: null,
      firstName: "",
      lastName: "",
      userName: "",
      phoneNo: "",
      validationCode: null,
      isAdmin: 0,
    },
    activeTab: "Home",
    clientWidth: document.documentElement.clientWidth,
    validPwToken: null
  };

  handleSetActiveTab = (tab) => {
    this.setState({ activeTab: tab });
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
              
            />
          </Content>
        </Container>
      </>
    );
  }
}

export default App;
